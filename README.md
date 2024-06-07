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

#### Create a virtual environment (optional but recommended):
   python -m venv env

### Activate the virtual environment:

#### On Windows:


.\env\Scripts\activate

#### On macOS and Linux:
source env/bin/activate

## Installation

## Run locally

Backend
```bash
cd server
pip install -r requirements.txt
uvicorn app.main:app --reload
```

frontend
```bash
  cd client
  npm install
  npm run dev
  ```

  

  
    