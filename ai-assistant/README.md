# CampusConnect AI

An optional local AI companion for the CampusConnect workshop. The existing
static HTML/CSS starter remains unchanged. This app provides a Streamlit UI,
a FastAPI REST backend, and local Ollama inference; uploaded PDFs are processed
locally and are not sent to a hosted AI service.

## Requirements

- Python 3.10 or newer
- [Ollama](https://ollama.com/) installed and running locally
- A model pulled into Ollama (the default is `llama3.2`)

Install the Python dependencies from this directory:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
ollama pull llama3.2
```

If PowerShell blocks activation, use the venv interpreter directly:
`.venv\Scripts\python.exe -m pip install -r requirements.txt`.

## Run locally

Start the backend in one terminal:

```powershell
cd ai-assistant
python -m uvicorn backend.main:app --reload
```

Start the Streamlit frontend in a second terminal:

```powershell
cd ai-assistant
python -m streamlit run frontend/app.py
```

Open the local Streamlit URL printed in the terminal. The frontend defaults to
`http://localhost:8000` for the backend. Set `AI_BACKEND_URL` if it runs at a
different address.

## Configuration

| Environment variable | Default | Description |
|---|---|---|
| `OLLAMA_URL` | `http://localhost:11434` | Local Ollama server URL |
| `OLLAMA_MODEL` | `llama3.2` | Model already available to Ollama |
| `AI_BACKEND_URL` | `http://localhost:8000` | FastAPI URL used by Streamlit |

PDF uploads are limited to 10 MB and extracted documents to 40,000 characters.
Scanned/image-only and password-protected PDFs are not supported.

## REST API

FastAPI's interactive OpenAPI UI is at `http://localhost:8000/docs`; its schema
is at `http://localhost:8000/openapi.json`.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/health` | Backend health check |
| `POST` | `/api/v1/chat` | Generate a campus-events chat response |
| `POST` | `/api/v1/documents/extract` | Extract text from an uploaded PDF |
| `POST` | `/api/v1/documents/summarize` | Summarize an uploaded PDF |
| `POST` | `/api/v1/documents/ask` | Answer a question using an uploaded PDF |

Document endpoints accept `multipart/form-data` with a `file` field; the ask
endpoint also requires a `question` field. Chat accepts JSON with a `messages`
array containing `user` and `assistant` messages.

## Run tests

From this directory, run:

```powershell
python -m unittest discover -s tests
```
