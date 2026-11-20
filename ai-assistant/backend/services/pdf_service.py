from dataclasses import dataclass
from io import BytesIO

from pypdf import PdfReader
from pypdf.errors import PdfReadError

from ..config import settings


class InvalidPDFError(ValueError):
    pass


@dataclass(frozen=True)
class ExtractedPDF:
    pages: int
    text: str


def extract_pdf(data: bytes) -> ExtractedPDF:
    try:
        reader = PdfReader(BytesIO(data), strict=True)
        if reader.is_encrypted:
            raise InvalidPDFError("Password-protected PDFs are not supported.")
        pages = len(reader.pages)
        text = "\n\n".join(page.extract_text() or "" for page in reader.pages).strip()
    except PdfReadError as error:
        raise InvalidPDFError("The uploaded file is not a readable PDF.") from error

    if not pages or not text:
        raise InvalidPDFError("The PDF contains no extractable text.")
    if len(text) > settings.max_pdf_characters:
        raise InvalidPDFError(
            f"The extracted PDF text exceeds the {settings.max_pdf_characters:,} "
            "character processing limit."
        )
    return ExtractedPDF(pages=pages, text=text)
