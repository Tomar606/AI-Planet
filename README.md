# AI Planet Chat Application

## Overview

The AI Planet Chat Application is a web-based platform that allows users to upload PDFs and engage in chat interactions with an AI. The application consists of a React-based frontend and a Flask-based backend. This README provides setup instructions, API documentation, and a brief overview of the application's architecture.


## Setup Instructions

### Backend Setup
1. **Clone the repository:**

   ```sh
   git clone https://github.com/Tomar606/AI-Planet.git
   cd AI-Planet/server

### Create an .env file inside the server folder and put your openai API key inside it
OPENAI_API_KEY= <paste your key here>

## Installation

## Run locally

Backend (Windows)
```bash
cd server
python -m venv env
.\env\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Backend (MacOS and Linux)
```bash
cd server
python -m venv env
source env/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

frontend
```bash
  cd client
  npm install
  npm run dev
  ```

  

  
    
