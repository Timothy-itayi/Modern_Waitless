import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

const menuItems = [
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
    "category": "desserts",
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
    "category": "drinks",
    "image_url": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=200",
    "available": true
  },
  {
    "name": "Spring Rolls",
    "price": 7.99,
    "description": "Crispy fried rolls filled with vegetables and served with sweet chili sauce",
    "category": "appetizers",
    "image_url": "https://images.unsplash.com/photo-1606335543042-57c525922933?q=80&w=200",
    "available": true
  },
  {
    "name": "Coconut Soup",
    "price": 13.99,
    "description": "Creamy coconut soup with mushrooms, lemongrass, and galangal",
    "category": "soups",
    "image_url": "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=200",
    "available": true
  },
  {
    "name": "Pineapple Fried Rice",
    "price": 15.99,
    "description": "Fried rice with pineapple, cashews, raisins, and curry powder",
    "category": "mains",
    "image_url": "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200",
    "available": true
  },
  {
    "name": "Coconut Ice Cream",
    "price": 6.99,
    "description": "Creamy coconut ice cream topped with crushed peanuts",
    "category": "desserts",
    "image_url": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=200",
    "available": true
  }
];

export async function GET() {
  try {
    console.log("Database initialization started");
    const client = await clientPromise;
    const db = client.db('waitlessMenu');
    
    // Create collections if they don't exist
    const menuCollection = db.collection('menu_List');
    const ordersCollection = db.collection('orders');
    
    // Clear existing menu items (optional - remove this if you want to keep existing items)
    await menuCollection.deleteMany({});
    console.log("Cleared existing menu items");
    
    // Insert menu items
    const result = await menuCollection.insertMany(menuItems);
    console.log(`Inserted ${result.insertedCount} menu items`);
    
    // Get count to verify
    const count = await menuCollection.countDocuments();
    console.log(`Total menu items in database: ${count}`);
    
    return NextResponse.json({ 
      success: true, 
      message: "Database initialized successfully",
      count: count
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal Server Error', 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
} 