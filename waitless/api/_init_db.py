from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB connection string
MONGODB_URI = os.getenv("MONGODB_URI")

# Connect to MongoDB
client = MongoClient(MONGODB_URI)
db = client.restaurant_db

# Create collections if they don't exist
menu_collection = db.menu_items
orders_collection = db.orders
reservations_collection = db.reservations

# Add sample menu items
sample_menu_items = [
    {
        "name": "Margherita Pizza",
        "price": 12.99,
        "description": "Classic pizza with tomato sauce, mozzarella, and basil",
        "category": "pizza",
        "image_url": "https://example.com/margherita.jpg",
        "available": True
    },
    {
        "name": "Caesar Salad",
        "price": 8.99,
        "description": "Romaine lettuce with Caesar dressing, croutons, and parmesan",
        "category": "salad",
        "image_url": "https://example.com/caesar.jpg",
        "available": True
    },
    {
        "name": "Spaghetti Carbonara",
        "price": 14.99,
        "description": "Spaghetti with egg, cheese, pancetta, and black pepper",
        "category": "pasta",
        "image_url": "https://example.com/carbonara.jpg",
        "available": True
    }
]

# Insert sample menu items if collection is empty
if menu_collection.count_documents({}) == 0:
    menu_collection.insert_many(sample_menu_items)
    print("Sample menu items added to database")
else:
    print("Menu items collection already has data")

print("Database initialization complete")