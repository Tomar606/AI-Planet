import os
from dotenv import load_dotenv
import openai
import fitz  # PyMuPDF
from llama_index.core import SimpleDirectoryReader, GPTVectorStoreIndex, Document
from fastapi import HTTPException

UPLOAD_DIR = "uploads"

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# Set OpenAI API key
openai.api_key = api_key

def extract_text_from_pdf(file_path: str) -> str:
    try:
        document = fitz.open(file_path)
        text = ""
        for page_num in range(len(document)):
            page = document.load_page(page_num)
            text += page.get_text()
        return text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting text from PDF: {e}")

def ask_question(file_name: str, question: str) -> str:
    file_path = os.path.join(UPLOAD_DIR, file_name)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    text = extract_text_from_pdf(file_path)
    document = Document(text)
    documents = [document]

    # Create LlamaIndex
    index = GPTVectorStoreIndex.from_documents(documents)

    # Query the index
    response = index.query(question)
    return response
