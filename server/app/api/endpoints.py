import os
from pydantic import BaseModel
from fastapi import APIRouter, File, UploadFile, HTTPException, Query
from app.models.question_request import QuestionRequest
from app.services.pdf_service import extract_text_from_pdf, ask_question

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        f.write(await file.read())
    text = extract_text_from_pdf(file_location)
    return {"filename": file.filename, "uploaded_path": file_location, "text": text}

class QuestionRequest(BaseModel):
    filename: str
    question: str

@router.post("/ask-question")
async def ask_question_endpoint(request: QuestionRequest):
    answer = ask_question(request.filename, request.question)
    if answer is None:
        raise HTTPException(status_code=404, detail="Answer not found")
    return {"answer": answer}
