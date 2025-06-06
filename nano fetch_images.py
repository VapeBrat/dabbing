import json
import requests
from dotenv import load_dotenv
import os

load_dotenv()

TOKEN = os.getenv("BC_TOKEN")
STORE_HASH = os.getenv("BC_STORE_HASH")
HEADERS = {
    "X-Auth-Token": TOKEN,
    "Accept": "application/json",
    "Content-Type": "application/json"
}

def fetch_image(product_id):
    url = f"https://api.bigcommerce.com/stores/{STORE_HASH}/v3/catalog/products/{product_id}/images"
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        data = response.json().get("data", [])
        if data:
            return data[0].get("url_standard")
    return None

with open("bangerData.json", "r") as f:
    data = json.load(f)

for item in data:
    img = fetch_image(item["id"])
    if img:
        item["image"] = img
    else:
        item["image"] = "Image not available"

with open("bangerData_with_images.json", "w") as f:
    json.dump(data, f, indent=2)

print("✅ bangerData_with_images.json has been created with image links.")
