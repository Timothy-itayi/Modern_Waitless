import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    console.log('Menu API route called');
    const client = await clientPromise;
    const db = client.db('waitlessMenu');
    const menuCollection = db.collection('menu_List');
    
    // Get all menu items
    const menuItems = await menuCollection.find({}).project({ _id: 0 }).toArray();
    console.log(`Found ${menuItems.length} menu items`);
    
    // Send response
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error in menu API:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
} 