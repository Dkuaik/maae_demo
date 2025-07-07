from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, Optional
from pydantic import BaseModel

from adapters.driver.llm_adapter import LLMAdapter
from adapters.driven.repository_adapter import InMemoryRepositoryAdapter
from domain.schemas.interaction import LLMInteraction

app = FastAPI(
    title="MAAe LLM API",
    description="API for MAAe LLM services using hexagonal architecture",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize adapters
llm_adapter = LLMAdapter()
repository_adapter = InMemoryRepositoryAdapter()

class ChatRequest(BaseModel):
    message: str
    uuid: str

@app.get("/")
async def root():
    return {"message": "Welcome to MAAe LLM API"}

@app.post("/process-prompt")
async def process_prompt(prompt: str) -> Dict[str, Any]:
    """Process a prompt through the LLM and store the interaction"""
    try:
        # Process prompt through LLM
        response = await llm_adapter.process_prompt(prompt)
        
        # Store interaction
        await repository_adapter.save_interaction(prompt, response)
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: ChatRequest) -> Dict[str, Any]:
    """Process a chat message through OpenRouter"""
    try:
        response = await llm_adapter.openrouter_chat(request.message, request.uuid)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/interaction-history")
async def get_history(limit: Optional[int] = None) -> Dict[str, Any]:
    """Retrieve interaction history"""
    try:
        history = await repository_adapter.get_interaction_history(limit)
        return {"history": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)