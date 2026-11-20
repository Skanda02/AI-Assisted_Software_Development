from typing import Literal

from pydantic import BaseModel, Field, model_validator


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=8_000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=20)

    @model_validator(mode="after")
    def last_message_must_be_from_user(self) -> "ChatRequest":
        if self.messages[-1].role != "user":
            raise ValueError("The last conversation message must be from the user.")
        return self


class ChatResponse(BaseModel):
    response: str


class PDFTextResponse(BaseModel):
    filename: str
    pages: int
    text: str


class SummaryResponse(BaseModel):
    filename: str
    summary: str


class PDFAnswerResponse(BaseModel):
    filename: str
    answer: str
