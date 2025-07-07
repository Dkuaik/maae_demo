from typing import Dict, Any
from utils.open_router import OpenRouterAPI
from domain.prompts.config import chatbot_prompt
# from utils.api_keys import OPENROUTER_API_KEY

class LLMService:
    """Service class to handle LLM business logic"""
    
    def __init__(self, model_config: Dict[str, Any] = None):
        self.model_config = model_config or {}
        self.openrouter_client = OpenRouterAPI(model='google/gemini-2.0-flash-001')
    
    async def process_prompt(self, prompt: str) -> Dict[str, Any]:
        """Process a prompt and return the LLM response"""
        messages = [
            {"role": "system", "content": chatbot_prompt},
            {"role": "user", "content": prompt}
        ]
        return self.openrouter_client.send_request(messages, None)

    async def process_chat(self, message: str, uuid: str) -> Dict[str, Any]:
        """Process a chat message and return formatted response with UUID"""
        try:
            messages = [
                {"role": "system", "content": chatbot_prompt},
                {"role": "user", "content": message}
            ]
            response = self.openrouter_client.send_request(
                messages
            )
            
            # Extract the actual response text from OpenRouter's response
            response_text = response.get("choices", [{}])[0].get("message", {}).get("content", "")
            
            # Format the response as requested
            return {
                "response": response_text,
                "uuid": uuid
            }
        except Exception as e:
            return {
                "error": str(e),
                "uuid": uuid
            }