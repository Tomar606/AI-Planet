from fastapi import FastAPI
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.api.endpoints import router

app = FastAPI()

app.include_router(router)

@app.get('/')
def homepage():
    return "Hello World !!"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

