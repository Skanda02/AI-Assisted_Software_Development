import unittest
from unittest.mock import Mock, patch

from fastapi.testclient import TestClient

from backend.main import app
from backend.services.ollama_service import OllamaUnavailableError


class ChatEndpointTests(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(app)

    def test_health_endpoint(self) -> None:
        response = self.client.get("/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    @patch("backend.main.generate_response", return_value="Check the event page.")
    def test_chat_uses_backend_generation(self, generate_response: Mock) -> None:
        response = self.client.post(
            "/api/v1/chat",
            json={"messages": [{"role": "user", "content": "What events are available?"}]},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"response": "Check the event page."})
        generate_response.assert_called_once()

    def test_chat_rejects_assistant_as_last_message(self) -> None:
        response = self.client.post(
            "/api/v1/chat",
            json={"messages": [{"role": "assistant", "content": "Hello."}]},
        )

        self.assertEqual(response.status_code, 422)

    @patch(
        "backend.main.generate_response",
        side_effect=OllamaUnavailableError("Ollama is unavailable."),
    )
    def test_chat_reports_unavailable_ollama(self, _generate_response: Mock) -> None:
        response = self.client.post(
            "/api/v1/chat",
            json={"messages": [{"role": "user", "content": "Hello."}]},
        )

        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json()["detail"], "Ollama is unavailable.")

    def test_document_endpoint_rejects_non_pdf_extension(self) -> None:
        response = self.client.post(
            "/api/v1/documents/extract",
            files={"file": ("notes.txt", b"not a pdf", "text/plain")},
        )

        self.assertEqual(response.status_code, 415)


if __name__ == "__main__":
    unittest.main()
