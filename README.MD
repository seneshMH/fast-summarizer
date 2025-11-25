# Fast Summarizer

A modern web application for extractive text summarization using AI-powered algorithms. Fast Summarizer analyzes your text and generates concise summaries while preserving the most important information.

## 🌟 Features

- **Extractive Summarization**: Uses PageRank algorithm with sentence similarity analysis
- **Customizable Length**: Adjust summary length from 10% to 90% of original text
- **Real-time Processing**: Fast API backend with instant results

## 🏗️ Architecture

This project consists of two main components:

### Backend (FastAPI)

- **Framework**: FastAPI with Python
- **Algorithm**: TextRank-based extractive summarization
- **NLP Libraries**: NLTK, NetworkX, NumPy
- **API Endpoint**: `/summarize` (POST)

### Frontend (Next.js)

- **Framework**: Next.js 15 with React 19
- **Environment**: Configurable backend URL via `.env`

## 📋 Prerequisites

- **Python**: 3.8 or higher
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:

   - **Windows**:
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Run the FastAPI server:

```bash
python main.py
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file (optional):

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. Run the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📖 How It Works

### Summarization Algorithm

1. **Text Preprocessing**: Removes stopwords and punctuation, tokenizes sentences
2. **Similarity Matrix**: Calculates cosine similarity between all sentence pairs
3. **Graph Construction**: Creates a graph where sentences are nodes and similarities are edges
4. **PageRank Scoring**: Applies PageRank algorithm to rank sentence importance
5. **Summary Generation**: Selects top-ranked sentences based on desired percentage

### API Usage

**Endpoint**: `POST /summarize`

**Request Body**:

```json
{
  "text": "Your long text to summarize...",
  "percentage": 0.5
}
```

**Response**:

```json
{
  "summary": [
    "First important sentence.",
    "Second important sentence.",
    "Third important sentence."
  ]
}
```

## 🛠️ Technology Stack

### Backend

- FastAPI
- NLTK (Natural Language Toolkit)
- NetworkX (Graph algorithms)
- NumPy (Numerical computing)
- Uvicorn (ASGI server)

### Frontend

- Next.js 15
- React 19
- TypeScript

## 🔧 Configuration

### Backend Configuration

- **Host**: `0.0.0.0` (accessible from network)
- **Port**: `8000`
- **CORS**: Enabled for all origins (adjust for production)

### Frontend Configuration

- **Backend URL**: Set via `NEXT_PUBLIC_BACKEND_URL` environment variable
- **Default**: `http://localhost:8000`

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ using FastAPI and Next.js**
