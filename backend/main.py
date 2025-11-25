import nltk
import string
import numpy as np
import networkx as nx
from nltk.cluster.util import cosine_distance
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn
import os

# Configure NLTK data path for serverless/restricted environments
# Use /tmp directory which is writable in serverless environments
nltk_data_dir = '/tmp/nltk_data'
os.makedirs(nltk_data_dir, exist_ok=True)
nltk.data.path.insert(0, nltk_data_dir)

# Download necessary NLTK data to /tmp
try:
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    try:
        nltk.download('punkt_tab', download_dir=nltk_data_dir, quiet=True)
    except Exception as e:
        print(f"Warning: Could not download punkt_tab: {e}")
        # Try alternative punkt if punkt_tab fails
        try:
            nltk.download('punkt', download_dir=nltk_data_dir, quiet=True)
        except Exception as e2:
            print(f"Warning: Could not download punkt: {e2}")

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    try:
        nltk.download('stopwords', download_dir=nltk_data_dir, quiet=True)
    except Exception as e:
        print(f"Warning: Could not download stopwords: {e}")

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=False,  # Must be False when using wildcard origins
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class SummarizeRequest(BaseModel):
    text: str
    percentage: float = 0.5

class SummarizeResponse(BaseModel):
    summary: List[str]

def preprocess(text):
    stopwords = nltk.corpus.stopwords.words('english')
    formatted_text = text.lower()
    tokens = []
    for token in nltk.word_tokenize(formatted_text):
        tokens.append(token)
    tokens = [word for word in tokens if word not in stopwords and word not in string.punctuation]
    formatted_text = ' '.join(element for element in tokens)
    return formatted_text

def calculate_sentence_similarity(sentence1, sentence2):
    words1 = [word for word in nltk.word_tokenize(sentence1)]
    words2 = [word for word in nltk.word_tokenize(sentence2)]
    all_words = list(set(words1 + words2))
    vector1 = [0] * len(all_words)
    vector2 = [0] * len(all_words)
    
    for word in words1:
        vector1[all_words.index(word)] += 1
    for word in words2:
        vector2[all_words.index(word)] += 1

    return 1 - cosine_distance(vector1, vector2)

def calculate_similarity_matrix(sentences):
    similarity_matrix = np.zeros((len(sentences), len(sentences)))
    for i in range(len(sentences)):
        for j in range(len(sentences)):
            if i == j:
                continue
            similarity_matrix[i][j] = calculate_sentence_similarity(sentences[i], sentences[j])
    return similarity_matrix

def summarize_text(text, percentage):
    original_sentences = [sentence for sentence in nltk.sent_tokenize(text)]
    if not original_sentences:
        return []
        
    formatted_sentences = [preprocess(original_sentence) for original_sentence in original_sentences]
    similarity_matrix = calculate_similarity_matrix(formatted_sentences)

    similarity_graph = nx.from_numpy_array(similarity_matrix)
    scores = nx.pagerank(similarity_graph)
    ordered_scores = sorted(((scores[i], score) for i, score in enumerate(original_sentences)), reverse=True)

    number_of_sentences = int(len(formatted_sentences) * percentage)
    if number_of_sentences < 1:
        number_of_sentences = 1

    best_sentences = []
    for i in range(min(number_of_sentences, len(ordered_scores))):
        best_sentences.append(ordered_scores[i][1])
    
    return best_sentences

@app.post("/summarize", response_model=SummarizeResponse)
async def summarize_endpoint(request: SummarizeRequest):
    try:
        summary = summarize_text(request.text, request.percentage)
        return SummarizeResponse(summary=summary)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
