"""
Script to pre-download NLTK data for deployment.
Run this script before deploying to download the required NLTK data.
"""
import nltk
import os

# Create nltk_data directory
nltk_data_dir = os.path.join(os.path.dirname(__file__), 'nltk_data')
os.makedirs(nltk_data_dir, exist_ok=True)

# Download required NLTK data
print("Downloading NLTK data...")
nltk.download('punkt', download_dir=nltk_data_dir)
nltk.download('stopwords', download_dir=nltk_data_dir)
print("NLTK data downloaded successfully!")
print(f"Data saved to: {nltk_data_dir}")
