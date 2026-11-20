import httpx
from ollama import Client, ResponseError

from ..config import settings
from .prompts import CAMPUSCONNECT_SYSTEM_PROMPT


class OllamaUnavailableError(RuntimeError):
    pass


class OllamaModelError(RuntimeError):
    pass


def generate_response(messages: list[dict[str, str]]) -> str:
    client = Client(host=settings.ollama_url)
    conversation = [
        {"role": "system", "content": CAMPUSCONNECT_SYSTEM_PROMPT},
        *messages,
    ]
    try:
        result = client.chat(model=settings.ollama_model, messages=conversation)
    except httpx.HTTPError as error:
        raise OllamaUnavailableError(
            f"Could not connect to Ollama at {settings.ollama_url}. "
            "Make sure Ollama is running locally."
        ) from error
    except ResponseError as error:
        raise OllamaModelError(
            f"Ollama could not use model '{settings.ollama_model}': {error.error}"
        ) from error

    content = result.message.content
    if not content.strip():
        raise OllamaModelError("Ollama returned an empty response.")
    return content
