import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    console.log('Menu API route called');
    
    // Connect to MongoDB
    const client = await clientPromise;
    console.log('MongoDB connection established');
    
    // Access the database
    const db = client.db('waitlessMenu');
    
    // Try both possible collection names
    let menuCollection;
    try {
      menuCollection = db.collection('menu_List');
      const count = await menuCollection.countDocuments();
      console.log(`Found ${count} documents in menu_List collection`);
      
      if (count === 0) {
        // If menu_List is empty, try menu_list (lowercase L)
        menuCollection = db.collection('menu_list');
        const lowerCount = await menuCollection.countDocuments();
        console.log(`Found ${lowerCount} documents in menu_list collection`);
        
        if (lowerCount === 0) {
          // If both are empty, return sample data
          console.log('No menu items found in database, returning sample data');
          return NextResponse.json(getSampleMenuItems());
        }
      }
    } catch (err) {
      console.error('Error accessing collection:', err);
      // Return sample data as fallback
      return NextResponse.json(getSampleMenuItems());
    }
    
    // Get all menu items
    const menuItems = await menuCollection.find({}).project({ _id: 0 }).toArray();
    console.log(`Returning ${menuItems.length} menu items from database`);
    
    // Send response
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error in menu API:', error);
    
    // Return sample data as fallback in case of error
    console.log('Returning sample data due to error');
    return NextResponse.json(getSampleMenuItems());
  }
}

// Sample menu items to use as fallback
function getSampleMenuItems() {
  return [
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
      "name": "Thai Iced Tea",
      "price": 4.99,
      "description": "Sweet tea with condensed milk and spices served over ice",
      "category": "drinks",
      "image_url": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=200",
      "available": true
    }
  ];
} 