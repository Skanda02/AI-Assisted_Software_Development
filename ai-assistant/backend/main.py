from fastapi import FastAPI, File, Form, HTTPException, UploadFile, status

from .config import settings
from .models import (
    ChatRequest,
    ChatResponse,
    PDFAnswerResponse,
    PDFTextResponse,
    SummaryResponse,
)
from .services.ollama_service import (
    OllamaModelError,
    OllamaUnavailableError,
    generate_response,
)
from .services.pdf_service import ExtractedPDF, InvalidPDFError, extract_pdf
from .services.prompts import question_messages, summary_messages

app = FastAPI(
    title="CampusConnect AI API",
    description=(
        "Local campus-events chat and PDF services powered by Ollama. "
        "Interactive API documentation is available at /docs."
    ),
    version="1.0.0",
)


@app.get("/health", tags=["health"])
def health() -> dict[str, str]:
    return {"status": "ok"}


def _generate(messages: list[dict[str, str]]) -> str:
    try:
        return generate_response(messages)
    except OllamaUnavailableError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(error)
        ) from error
    except OllamaModelError as error:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail=str(error)
        ) from error


async def _read_pdf(file: UploadFile) -> tuple[str, ExtractedPDF]:
    filename = file.filename or ""
    if not filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=415, detail="Upload a file with a .pdf extension.")

    data = await file.read(settings.max_pdf_bytes + 1)
    await file.close()
    if len(data) > settings.max_pdf_bytes:
        raise HTTPException(status_code=413, detail="PDF exceeds the 10 MB upload limit.")
    if not data.startswith(b"%PDF-"):
        raise HTTPException(status_code=415, detail="The uploaded file is not a PDF.")

    try:
        return filename, extract_pdf(data)
    except InvalidPDFError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error


@app.post("/api/v1/chat", response_model=ChatResponse, tags=["chat"])
def chat(request: ChatRequest) -> ChatResponse:
    messages = [message.model_dump() for message in request.messages]
    return ChatResponse(response=_generate(messages))


@app.post(
    "/api/v1/documents/extract",
    response_model=PDFTextResponse,
    tags=["documents"],
)
async def extract_document(file: UploadFile = File(...)) -> PDFTextResponse:
    filename, pdf = await _read_pdf(file)
    return PDFTextResponse(filename=filename, pages=pdf.pages, text=pdf.text)


@app.post(
    "/api/v1/documents/summarize",
    response_model=SummaryResponse,
    tags=["documents"],
)
async def summarize_document(file: UploadFile = File(...)) -> SummaryResponse:
    filename, pdf = await _read_pdf(file)
    summary = _generate(summary_messages(pdf))
    return SummaryResponse(filename=filename, summary=summary)


@app.post(
    "/api/v1/documents/ask",
    response_model=PDFAnswerResponse,
    tags=["documents"],
)
async def ask_document(
    file: UploadFile = File(...),
    question: str = Form(min_length=1, max_length=2_000),
) -> PDFAnswerResponse:
    filename, pdf = await _read_pdf(file)
    answer = _generate(question_messages(pdf, question.strip()))
    return PDFAnswerResponse(filename=filename, answer=answer)
