import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from './lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('waitlessMenu');
      const ordersCollection = db.collection('orders');
      
      // Get all orders
      const orders = await ordersCollection.find({}).project({ _id: 0 }).toArray();
      
      // Send response
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error in orders API:', error);
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  } else if (req.method === 'POST') {
    try {
      const orderData = req.body;
      
      const client = await clientPromise;
      const db = client.db('waitlessMenu');
      const ordersCollection = db.collection('orders');
      
      // Insert order
      await ordersCollection.insertOne(orderData);
      
      // Send response
      res.status(201).json({ success: true, message: 'Order created successfully' });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 