import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

PORT = int(os.getenv("PORT", "3000"))
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "service": "RETURNIQ Flask Backend",
        "gemini_configured": bool(GEMINI_API_KEY)
    })


@app.post("/api/analyze")
def analyze():
    """
    Basic API endpoint for the frontend.
    Add the repository's official AI observation/verification
    logic here without changing the official schemas/rules.
    """
    data = request.get_json(silent=True) or {}

    return jsonify({
        "status": "received",
        "message": "Return analysis request received.",
        "data": data
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
