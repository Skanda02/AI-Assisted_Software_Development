import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    ollama_url: str = os.getenv("OLLAMA_URL", "http://localhost:11434")
    ollama_model: str = os.getenv("OLLAMA_MODEL", "llama3.2")
    max_pdf_bytes: int = 10 * 1024 * 1024
    max_pdf_characters: int = 40_000


settings = Settings()
