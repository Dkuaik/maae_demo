from pydantic import BaseModel
from typing import Dict, Any
from datetime import datetime

class LLMInteraction(BaseModel):
    """Schema representing an LLM interaction"""
    id: str
    prompt: str
    response: Dict[str, Any]
    timestamp: datetime
    
    class Config:
        from_attributes = True