import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from './lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Attempting to connect to MongoDB...");
    const client = await clientPromise;
    
    // Test the connection
    const dbNames = await client.db().admin().listDatabases();
    console.log(`Connection successful! Available databases: ${dbNames.databases.map(db => db.name).join(', ')}`);
    
    // Access the waitlessMenu database
    const db = client.db('waitlessMenu');
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log(`Collections in waitlessMenu database: ${collections.map(c => c.name).join(', ')}`);
    
    res.status(200).json({ 
      message: "MongoDB connection successful",
      databases: dbNames.databases.map(db => db.name),
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    res.status(500).json({ 
      error: 'MongoDB Connection Error', 
      message: error instanceof Error ? error.message : String(error) 
    });
  }
} 