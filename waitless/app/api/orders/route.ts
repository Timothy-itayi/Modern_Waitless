import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('waitlessMenu');
    const ordersCollection = db.collection('orders');
    
    // Get all orders
    const orders = await ordersCollection.find({}).project({ _id: 0 }).toArray();
    
    // Send response
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error in orders API:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    const client = await clientPromise;
    const db = client.db('waitlessMenu');
    const ordersCollection = db.collection('orders');
    
    // Insert order
    await ordersCollection.insertOne(orderData);
    
    // Send response
    return NextResponse.json(
      { success: true, message: 'Order created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
} 