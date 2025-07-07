from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List

class RepositoryPort(ABC):
    """Port that defines the database operations"""
    
    @abstractmethod
    async def save_interaction(self, prompt: str, response: Dict[str, Any]) -> bool:
        """Save an LLM interaction to the database"""
        pass
    
    @abstractmethod
    async def get_interaction_history(self, limit: Optional[int] = None) -> List[Dict[str, Any]]:
        """Retrieve interaction history from the database"""
        pass