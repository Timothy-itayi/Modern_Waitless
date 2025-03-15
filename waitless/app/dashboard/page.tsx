import React from 'react';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import MenuDisplay from '../components/MenuDisplay';

// This is a server component for authentication
export default async function Dashboard() {
  // Get the auth session
  const { userId } = await auth();
  
  // If no user is authenticated, redirect to sign-in
  if (!userId) {
    redirect('/sign-in');
  }
  
  // Get the current user data
  const user = await currentUser();
  
  return (
    <div className="p-6 bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen">
      <h1 className="text-3xl font-serif text-amber-900 mb-6 text-center italic drop-shadow-md">
        Welcome, {user?.firstName || 'Customer'}!
      </h1>
      
      <div className="min-h-screen bg-gradient-to-b from-red-950 to-red-900 p-4 sm:p-6 relative">
        {/* Thai pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563245370-64f766264697?q=80&w=200')] opacity-5 bg-repeat pointer-events-none"></div>
        
        <div className="relative z-10">
          {/* Header with restaurant name */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 mr-3">
              {/* Icon placeholder */}
              <div className="w-full h-full rounded-full bg-orange-500 opacity-80 flex items-center justify-center text-white">
                🔥
              </div>
            </div>
            <h1 className="text-3xl font-serif text-orange-100 text-center drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] italic">
              Siam Orchid
            </h1>
          </div>
          
          {/* Client component for menu and order management */}
          <MenuDisplay userId={userId} userName={user?.firstName || 'Customer'} />
        </div>
      </div>
    </div>
  );
} 