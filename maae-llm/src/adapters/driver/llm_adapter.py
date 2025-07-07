from typing import Dict, Any
from ports.driver.llm_port import LLMPort
from domain.services.llm_service import LLMService

class LLMAdapter(LLMPort):
    """Adapter implementing the LLM port operations"""
    
    def __init__(self, model_config: Dict[str, Any] = None):
        self.service = LLMService(model_config)
    
    async def process_prompt(self, prompt: str) -> Dict[str, Any]:
        """Pass the prompt to the service and return its response"""
        return await self.service.process_prompt(prompt)

    async def openrouter_chat(self, message: str, uuid: str) -> Dict[str, Any]:
        """Pass the chat message to the service and return its response"""
        return await self.service.process_chat(message, uuid)