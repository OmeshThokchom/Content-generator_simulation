from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import re
import locale

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
        
        # --- Extract Description from various sections ---
        full_description_parts = []

        # 1. Feature bullets (often "About this item")
        feature_bullets = soup.find(id='feature-bullets')
        if feature_bullets:
            description_items = feature_bullets.find_all('li')
            full_description_parts.append("About this item:\n" + '\n'.join([item.get_text(strip=True) for item in description_items]))

        # 2. Product Description (often a larger text block)
        product_description_div = soup.find(id='productDescription')
        if product_description_div:
            full_description_parts.append("Product Description:\n" + product_description_div.get_text(separator='\n', strip=True))

        # 3. Detail Bullets (e.g., technical specs, dimensions, additional info)
        detail_bullets = soup.find(id='detailBullets_feature_div')
        if detail_bullets:
            full_description_parts.append("Product Details:\n" + detail_bullets.get_text(separator='\n', strip=True))
        
        # 4. Technical Specifications Table
        tech_specs_table = soup.find(id='productDetails_techSpec_section_1')
        if tech_specs_table:
            full_description_parts.append("Technical Details:\n" + tech_specs_table.get_text(separator='\n', strip=True))

        # 5. A+ Content (often rich media, but can contain text)
        aplus_content = soup.find(id='aplus')
        if aplus_content:
            # Extract text from paragraphs and list items within A+ content
            aplus_text_elements = aplus_content.find_all(['p', 'li', 'h3'])
            aplus_text = '\n'.join([el.get_text(strip=True) for el in aplus_text_elements if el.get_text(strip=True)])
            if aplus_text:
                full_description_parts.append("Additional Information:\n" + aplus_text)

        # Combine all description parts
        description = '\n\n'.join(full_description_parts) if full_description_parts else "Description not found"


        # --- Extract Price ---
        price = "Price not found"
        raw_price_text = ""

        # Try to find the main price display (e.g., $123.45)
        price_whole = soup.find('span', class_='a-price-whole')
        price_fraction = soup.find('span', class_='a-price-fraction')
        price_symbol = soup.find('span', class_='a-price-symbol')

        if price_whole and price_fraction:
            raw_price_text = price_whole.get_text(strip=True) + price_fraction.get_text(strip=True)
        else:
            # Fallback to a-offscreen which often contains the full price string
            offscreen_price = soup.find('span', class_='a-offscreen')
            if offscreen_price:
                # Use regex to find a price pattern within the offscreen text
                price_match = re.search(r'(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?)', offscreen_price.get_text(strip=True))
                if price_match:
                    raw_price_text = price_match.group(1)
            else:
                # Further fallbacks for other price elements
                our_price = soup.find(id='priceblock_ourprice')
                if our_price:
                    raw_price_text = our_price.get_text(strip=True)
                else:
                    sale_price = soup.find(id='priceblock_saleprice')
                    if sale_price:
                        raw_price_text = sale_price.get_text(strip=True)
        
        # Clean and format the price string
        if raw_price_text:
            # Remove currency symbols and any non-numeric characters except for digits and a single decimal point
            # This regex removes anything that's not a digit or a dot, but only keeps the first dot
            cleaned_price = re.sub(r'[^\d.]', '', raw_price_text)
            
            # Handle multiple decimal points if they somehow slipped through (e.g., "1.23.45")
            parts = cleaned_price.split('.')
            if len(parts) > 2:
                cleaned_price = parts[0] + '.' + ''.join(parts[1:])
            
            try:
                # Convert to float
                numeric_price = float(cleaned_price)
                
                # Manual formatting for INR 1,310 (no decimal if .00)
                if numeric_price == int(numeric_price):
                    price = f"INR {int(numeric_price):,}"
                else:
                    price = f"INR {numeric_price:,.2f}"

            except ValueError:
                # If conversion fails, keep the original raw string
                price = raw_price_text # Fallback to raw if cleaning failed
        
        # --- Extract Category from breadcrumbs ---
        category = "Category not found"
        # Try main breadcrumb div
        breadcrumbs_div = soup.find(id='wayfinding-breadcrumbs_feature_div')
        if breadcrumbs_div:
            # Find all links within the breadcrumbs
            category_links = breadcrumbs_div.find_all('a')
            if category_links:
                # The last link is usually the most specific category
                category = category_links[-1].get_text(strip=True)
        else:
            # Fallback for other breadcrumb structures (e.g., newer layouts)
            alt_breadcrumbs = soup.select('ul.a-unordered-list.a-horizontal.a-size-small li.a-breadcrumb-item a')
            if alt_breadcrumbs:
                category = alt_breadcrumbs[-1].get_text(strip=True)


        return {
            "title": title.get_text(strip=True) if title else "Title not found",
            "image": image['src'] if image and 'src' in image.attrs else "Image not found",
            "description": description,
            "price": price,
            "category": category
        }

    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to fetch the product page: {e}"}
    except Exception as e:
        return {"error": f"An error occurred: {e}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)