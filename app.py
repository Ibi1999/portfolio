# app.py
import os
from typing import List, Literal, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# === import your RAG functions ===
# Put the code you shared (create_vector_store, get_rag_response, etc.)
# into rag_backend.py in the same folder, then:
from rag_model import get_rag_response, create_vector_store  # type: ignore

# --- sanity check for your GitHub Models token ---
if not os.getenv("GITHUB_TOKEN"):
    raise RuntimeError("GITHUB_TOKEN is not set in the environment.")

app = FastAPI(title="Ibrahim RAG API", version="1.0")

# --- CORS (adjust as needed) ---
ALLOWED_ORIGINS = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://ibrahimoksuzoglu.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- models matching your frontend payloads ---
class Turn(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class RagIn(BaseModel):
    query: str
    history: Optional[List[Turn]] = []

class RagOut(BaseModel):
    answer: str
    sources: List[str]

@app.get("/")
def health():
    return {"status": "ok"}

@app.post("/rag", response_model=RagOut)
def rag_endpoint(payload: RagIn):
    q = (payload.query or "").strip()
    if not q:
        raise HTTPException(status_code=400, detail="Empty query.")
    # Convert Pydantic models to simple dicts for your function
    history = [{"role": t.role, "content": t.content} for t in (payload.history or [])]
    answer, sources = get_rag_response(q, chat_history=history)
    # Ensure types your frontend expects
    return RagOut(answer=answer or "", sources=sources or [])

@app.post("/rag/clear")
def rag_clear():
    # No server-side state to clear (your history is client-side),
    # but implement endpoint so the frontend "Clear Chat" works.
    return {"status": "cleared"}

# Optional: build index proactively on startup (safe to skip; your code lazy-builds)
@app.on_event("startup")
def warmup():
    try:
        # create_vector_store()  # uncomment to force index build at boot
        pass
    except Exception as e:
        # Don't crash the server on warmup failures; the lazy path will handle it
        print(f"[warmup] skipped: {e}")
