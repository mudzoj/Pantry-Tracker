import requests

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
api_key = "AIzaSyD-2ASuWCF0XX5jQ8Lv12OMtNDBmJayEOg"

headers = {
    "Content-Type": "application/json",
    "X-goog-api-key": api_key
}

data = {
    "contents": [
        {
            "parts": [
                {
                    "text": "Explain how AI works in a few words"
                }
            ]
        }
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
