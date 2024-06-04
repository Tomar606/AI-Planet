from pydantic import BaseModel

class QuestionRequest(BaseModel):
    question: str
    file_name: str
