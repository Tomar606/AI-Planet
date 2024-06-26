# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://ai-planet-xi.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specific origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}
