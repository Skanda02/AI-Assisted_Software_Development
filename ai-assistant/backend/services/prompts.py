from .pdf_service import ExtractedPDF

CAMPUSCONNECT_SYSTEM_PROMPT = (
    "You are CampusConnect's local campus-events assistant. Help students and "
    "administrators with campus events, registrations, schedules, and event "
    "documents. Be accurate, concise, and clear. Do not invent event details; "
    "when the available context does not contain an answer, say so."
)

PDF_SUMMARY_PROMPT = """Summarize the campus document below for a student or campus
administrator. Preserve important dates, requirements, policies, and action items.
Do not add facts that are not in the document.

Document:
"""

PDF_QUESTION_PROMPT = """Answer the user's question using only the supplied campus
document. If the document does not contain the answer, say that explicitly. Quote or
identify relevant sections when useful.

Document:
"""


def summary_messages(pdf: ExtractedPDF) -> list[dict[str, str]]:
    return [
        {"role": "user", "content": PDF_SUMMARY_PROMPT + pdf.text},
    ]


def question_messages(pdf: ExtractedPDF, question: str) -> list[dict[str, str]]:
    return [
        {
            "role": "user",
            "content": f"{PDF_QUESTION_PROMPT}{pdf.text}\n\nQuestion:\n{question}",
        },
    ]
