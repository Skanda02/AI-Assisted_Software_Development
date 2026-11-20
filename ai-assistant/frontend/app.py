import os

import httpx
import streamlit as st

DEFAULT_BACKEND_URL = os.getenv("AI_BACKEND_URL", "http://localhost:8000").rstrip("/")
CHAT_URL = "/api/v1/chat"
EXTRACT_URL = "/api/v1/documents/extract"
SUMMARY_URL = "/api/v1/documents/summarize"
QUESTION_URL = "/api/v1/documents/ask"

st.set_page_config(page_title="CampusConnect AI", page_icon="🎓")
st.title("CampusConnect AI")
st.caption("Ask about campus events or get help understanding a campus PDF.")

backend_url = st.sidebar.text_input("Backend URL", value=DEFAULT_BACKEND_URL).rstrip("/")


def request_json(
    path: str,
    *,
    json_body: dict[str, object] | None = None,
    files: dict[str, tuple[str, bytes, str]] | None = None,
    form_data: dict[str, str] | None = None,
) -> dict[str, object] | None:
    try:
        response = httpx.post(
            f"{backend_url}{path}",
            timeout=120.0,
            json=json_body,
            files=files,
            data=form_data,
        )
    except httpx.RequestError as error:
        st.error(f"Could not reach the backend at {backend_url}: {error}")
        return None

    if response.is_error:
        try:
            detail = response.json().get("detail", response.text)
        except ValueError:
            detail = response.text
        st.error(f"Backend error ({response.status_code}): {detail}")
        return None

    try:
        return response.json()
    except ValueError:
        st.error("The backend returned an invalid JSON response.")
        return None


if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("Ask about campus events"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)
    with st.chat_message("assistant"):
        with st.spinner("Thinking with your local Ollama model..."):
            result = request_json(
                CHAT_URL,
                json_body={"messages": st.session_state.messages[-20:]},
            )
        if result is not None:
            answer = str(result["response"])
            st.markdown(answer)
            st.session_state.messages.append(
                {"role": "assistant", "content": answer}
            )

st.divider()
st.subheader("Campus document tools")
uploaded_pdf = st.file_uploader("Choose a text-based PDF", type=["pdf"])
if uploaded_pdf is not None:
    file_data = uploaded_pdf.getvalue()
    upload = {
        "file": (
            uploaded_pdf.name,
            file_data,
            uploaded_pdf.type or "application/pdf",
        )
    }

    extract_column, summary_column = st.columns(2)
    with extract_column:
        if st.button("Extract text"):
            with st.spinner("Extracting PDF text..."):
                result = request_json(EXTRACT_URL, files=upload)
            if result is not None:
                st.text_area("Extracted text", str(result["text"]), height=240)

    with summary_column:
        if st.button("Summarize PDF"):
            with st.spinner("Summarizing with your local Ollama model..."):
                result = request_json(SUMMARY_URL, files=upload)
            if result is not None:
                st.markdown(str(result["summary"]))

    question = st.text_input("Ask a question about this PDF")
    if st.button("Ask about PDF", disabled=not question.strip()):
        with st.spinner("Searching the document with your local Ollama model..."):
            result = request_json(
                QUESTION_URL,
                files=upload,
                form_data={"question": question},
            )
        if result is not None:
            st.markdown(str(result["answer"]))
