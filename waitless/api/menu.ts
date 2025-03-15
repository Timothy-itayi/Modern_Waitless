import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from './lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('waitlessMenu');
      const menuCollection = db.collection('menu_List');
      
      // Get all menu items
      const menuItems = await menuCollection.find({}).project({ _id: 0 }).toArray();
      
      // Send response
      res.status(200).json(menuItems);
    } catch (error) {
      console.error('Error in menu API:', error);
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error instanceof Error ? error.message : String(error) 
      });
    }
  } else {
    // Handle OPTIONS or other methods
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 