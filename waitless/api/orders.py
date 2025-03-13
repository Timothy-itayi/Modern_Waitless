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
        orders_collection = db.orders
        
        # Get all orders
        orders = list(orders_collection.find({}, {'_id': False}))
        
        # Set response headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Send response
        self.wfile.write(json.dumps(orders).encode())
        
        # Close MongoDB connection
        client.close()
    
    def do_POST(self):
        # Get request body length
        content_length = int(self.headers['Content-Length'])
        
        # Read request body
        post_data = self.rfile.read(content_length)
        order_data = json.loads(post_data.decode('utf-8'))
        
        # Connect to MongoDB
        client = MongoClient(MONGODB_URI)
        db = client.restaurant_db
        orders_collection = db.orders
        
        # Insert order
        result = orders_collection.insert_one(order_data)
        
        # Set response headers
        self.send_response(201)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Send response
        response = {'success': True, 'message': 'Order created successfully'}
        self.wfile.write(json.dumps(response).encode())
        
        # Close MongoDB connection
        client.close()
        
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers() 