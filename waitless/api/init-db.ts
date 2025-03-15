import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from './lib/mongodb';

const MenuItems = [
  {
    "name": "Pad Thai",
    "price": 14.99,
    "description": "Stir-fried rice noodles with eggs, tofu, bean sprouts, and peanuts in a sweet and savory sauce",
    "category": "mains",
    "image_url": "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=200",
    "available": true
  },
  {
    "name": "Tom Yum Goong",
    "price": 16.95,
    "description": "Authentic Thai spicy shrimp soup with lemongrass, lime leaves, and chili",
    "category": "soups",
    "image_url": "https://images.unsplash.com/photo-1569562211093-4a0b93f39ffb?q=80&w=200",
    "available": true
  },
  {
    "name": "Green Curry",
    "price": 15.99,
    "description": "Spicy curry with coconut milk, bamboo shoots, eggplant, and Thai basil",
    "category": "mains",
    "image_url": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=200",
    "available": true
  },
  {
    "name": "Mango Sticky Rice",
    "price": 8.99,
    "description": "Sweet sticky rice with fresh mango and coconut cream",
    "category": "dessert",
    "image_url": "https://images.unsplash.com/photo-1621236378699-8597faf6a11a?q=80&w=200",
    "available": true
  },
  {
    "name": "Som Tum",
    "price": 12.99,
    "description": "Spicy green papaya salad with tomatoes, peanuts, and lime dressing",
    "category": "salads",
    "image_url": "https://images.unsplash.com/photo-1637806931079-d94d2d3b2fce?q=80&w=200",
    "available": true
  },
  {
    "name": "Thai Iced Tea",
    "price": 4.99,
    "description": "Sweet tea with condensed milk and spices served over ice",
    "category": "drinks",
    "image_url": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=200",
    "available": true
  },
  {
    "name": "Massaman Curry",
    "price": 16.99,
    "description": "Rich, mild curry with potatoes, peanuts, and tender meat",
    "category": "mains",
    "image_url": "https://images.unsplash.com/photo-1596797038530-2c107aa4e1f9?q=80&w=200",
    "available": true
  },
  {
    "name": "Thai Wine",
    "price": 9.99,
    "description": "Glass of house Thai wine",
    "category": "wine",
    "image_url": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=200",
    "available": true
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('waitlessMenu');
    
    // Create collections if they don't exist
    const menuCollection = db.collection('menu_List');
    const ordersCollection = db.collection('orders');
    const reservationsCollection = db.collection('reservations');
    
    // Insert sample menu items if collection is empty
    const menuCount = await menuCollection.countDocuments();
    if (menuCount === 0) {
      await menuCollection.insertMany(MenuItems);
      console.log("Sample menu items added to database");
    } else {
      console.log("Menu items collection already has data");
    }
    
    console.log("Database initialization complete");
    res.status(200).json({ message: "Database initialization complete" });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error instanceof Error ? error.message : String(error) 
    });
  }
} 