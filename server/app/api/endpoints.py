from fastapi import APIRouter, HTTPException, UploadFile, File, Depends, FastAPI
from pydantic import BaseModel
from app.services.pdf_service import ask_question
import os
import shutil


router = APIRouter()


class QuestionRequest(BaseModel):
    filename: str
    question: str

def get_question_request(request: QuestionRequest):
    return request

@router.post("/ask-question")
async def ask_question_endpoint(request: QuestionRequest = Depends(get_question_request)):
    answer = ask_question(request.filename, request.question)
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")
    return {"answer": answer}

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, file.filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return {"filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading PDF: {str(e)}")
