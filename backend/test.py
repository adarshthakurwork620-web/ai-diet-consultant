from dotenv import load_dotenv
import os
import requests

load_dotenv()
key = os.getenv('GEMINI_API_KEY')

url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={key}'
r = requests.post(url, json={'contents': [{'parts': [{'text': 'hello'}]}]})
print('Status:', r.status_code)
print('Response:', r.text[:1000])