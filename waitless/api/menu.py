from http.server import BaseHTTPRequestHandler
from pymongo import MongoClient
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB connection string
MONGODB_URI = os.getenv("MONGODB_URI")

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Connect to MongoDB
        client = MongoClient(MONGODB_URI)
        db = client.restaurant_db
        menu_collection = db.menu_items
        
        # Get all menu items
        menu_items = list(menu_collection.find({}, {'_id': False}))
        
        # Set response headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Send response
        self.wfile.write(json.dumps(menu_items).encode())
        
        # Close MongoDB connection
        client.close()
        
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
