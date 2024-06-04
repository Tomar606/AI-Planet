import os
import fitz
from llama_index.core import VectorStoreIndex, Document
from app.models.question_request import QuestionRequest
from fastapi import HTTPException

UPLOAD_DIR = "uploads"

def extract_text_from_pdf(file_path: str) -> str:
    with fitz.open(file_path) as pdf_document:
        text = ""
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
    return text

def ask_question(file_name: str, question: str):
    file_path = os.path.join(UPLOAD_DIR, file_name)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    text = extract_text_from_pdf(file_path)
    documents = [Document(text)]

    index = VectorStoreIndex(documents)

    response = index.query(question)
    answer = response.response  # Adjusting based on expected response structure

    return {"question": question, "answer": answer}