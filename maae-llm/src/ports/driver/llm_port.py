from abc import ABC, abstractmethod
from typing import Dict, Any

class LLMPort(ABC):
    """Port that defines the primary operations for LLM interactions"""
    
    @abstractmethod
    async def process_prompt(self, prompt: str) -> Dict[str, Any]:
        """Process a prompt and return the LLM response"""
        pass

    @abstractmethod
    async def openrouter_chat(self, message: str, uuid: str) -> Dict[str, Any]:
        """Process a chat message through OpenRouter and return the response with UUID"""
        pass