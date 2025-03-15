import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
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
    
    return NextResponse.json({ 
      message: "MongoDB connection successful",
      databases: dbNames.databases.map(db => db.name),
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    return NextResponse.json(
      { 
        error: 'MongoDB Connection Error', 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
} 