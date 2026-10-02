# RETURNIQ — Frontend + Flask Backend

## Structure

```text
RETURNIQ/
├── frontend/       React + Vite + Tailwind
├── backend/        Python + Flask
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## 1. Backend — Flask

Install Python 3.10+.

Open Terminal 1:

```bash
cd backend
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` from `.env.example`:

```env
GEMINI_API_KEY=your_real_key_here
PORT=3000
```

Run Flask:

```bash
python app.py
```

Backend:

```text
http://localhost:3000
```

Health check:

```text
http://localhost:3000/api/health
```

## 2. Frontend — React + Vite

Open Terminal 2:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Vite proxies `/api` requests to the Flask backend at port 3000.

## Important

Keep the Gemini API key only in:

```text
backend/.env
```

Do not put API keys in the frontend.

## Python backend architecture

```text
React/Vite Frontend
        |
        | HTTP / JSON
        v
Flask API
        |
        +--> AI / Gemini
        |
        +--> OCR / Vision
        |
        +--> Product Identity
        |
        +--> Completeness
        |
        +--> Condition
        |
        +--> Official Business Rules
        |
        +--> Evidence Record
        |
        v
Structured Result
```
