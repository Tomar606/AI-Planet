import os
from PyPDF2 import PdfReader
from fastapi import HTTPException
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.chains import conversational_retrieval
from langchain_community.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter

load_dotenv()

embeddings = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))


def extract_text_from_pdf(file_path: str) -> str:
    try:
        with open(file_path, "rb") as file:
            reader = PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading PDF: {str(e)}")

def ask_question(filename: str, question: str) -> str:
    file_path = os.path.join("uploads", filename)
    text = extract_text_from_pdf(file_path)

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_text(text)
    
    docsearch = FAISS.from_texts(texts, embeddings)
    
    qa_chain = load_qa_chain(OpenAI(temperature=0), chain_type="stuff")
    qa_pipeline = conversational_retrieval(retriever=docsearch.as_retriever(), combine_docs_chain=qa_chain)
    
    result = qa_pipeline({"question": question})
    return result["answer"]
