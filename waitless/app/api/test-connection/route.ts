import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import MenuList from '@/app/components/MenuList';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    
    // Try to connect to MongoDB
    const client = await clientPromise;
    console.log('MongoDB connection successful');
    
    // Get database info
    const adminDb = client.db().admin();
    const dbInfo = await adminDb.listDatabases();
    
    // Get list of databases
    const databases = dbInfo.databases.map(db => db.name);
    console.log('Available databases:', databases);
    
    // Check for our specific database
    const hasWaitlessMenu = databases.includes('waitlessMenu');
    console.log('waitlessMenu database exists:', hasWaitlessMenu);
    
    // If our database exists, check collections
    let collections: string[] = [];
    if (hasWaitlessMenu) {
      const db = client.db('waitlessMenu');
      const collectionObjects = await db.listCollections().toArray();
      collections = collectionObjects.map(col => col.name);
      console.log('Collections in waitlessMenu:', collections);
    }
    
    return NextResponse.json({
      connected: true,
      databases,
      waitlessMenuExists: hasWaitlessMenu,
      collections,
      mongodbUri: process.env.MONGODB_URI ? 
        `${process.env.MONGODB_URI.substring(0, 15)}...` : 
        'Not set'
    });
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json(
      {
        connected: false,
        error: error instanceof Error ? error.message : String(error),
        mongodbUri: process.env.MONGODB_URI ? 
          `${process.env.MONGODB_URI.substring(0, 15)}...` : 
          'Not set'
      },
      { status: 500 }
    );
  }
} 