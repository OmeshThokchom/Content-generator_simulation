from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class ScrapeRequest(BaseModel):
    url: str

@app.post("/api/scrape")
async def scrape_product(request: ScrapeRequest):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(request.url, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes

        soup = BeautifulSoup(response.content, 'html.parser')

        title = soup.find(id='productTitle')
        image = soup.find(id='imgTagWrapperId').find('img') if soup.find(id='imgTagWrapperId') else None
        feature_bullets = soup.find(id='feature-bullets')
        
        description_items = []
        if feature_bullets:
            description_items = feature_bullets.find_all('li')

        description = '\n'.join([item.get_text(strip=True) for item in description_items])

        return {
            "title": title.get_text(strip=True) if title else "Title not found",
            "image": image['src'] if image and 'src' in image.attrs else "Image not found",
            "description": description if description else "Description not found"
        }

    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to fetch the product page: {e}"}
    except Exception as e:
        return {"error": f"An error occurred: {e}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
