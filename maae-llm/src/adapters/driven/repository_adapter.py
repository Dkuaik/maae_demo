from typing import Dict, Any, Optional, List
from datetime import datetime
import uuid

from ports.driven.repository_port import RepositoryPort
from domain.schemas.interaction import LLMInteraction

class InMemoryRepositoryAdapter(RepositoryPort):
    """
    In-memory implementation of the repository port
    This is a simple implementation for development - in production you would
    implement a proper database adapter
    """
    
    def __init__(self):
        self.interactions: List[LLMInteraction] = []
    
    async def save_interaction(self, prompt: str, response: Dict[str, Any]) -> bool:
        """Save an LLM interaction to memory"""
        interaction = LLMInteraction(
            id=str(uuid.uuid4()),
            prompt=prompt,
            response=response,
            timestamp=datetime.utcnow()
        )
        self.interactions.append(interaction)
        return True
    
    async def get_interaction_history(self, limit: Optional[int] = None) -> List[Dict[str, Any]]:
        """Retrieve interaction history from memory"""
        history = self.interactions[-limit:] if limit else self.interactions
        return [interaction.dict() for interaction in history]