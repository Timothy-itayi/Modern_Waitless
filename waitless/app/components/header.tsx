'use client';

import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Header() {
  const { isLoaded, userId } = useAuth();
  
  // Debug authentication state
  useEffect(() => {
    if (isLoaded) {
      console.log("Auth state loaded, userId:", userId);
    }
  }, [isLoaded, userId]);

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          Waitless
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <SignedIn>
          {/* This content will only show when the user is signed in */}
          <Link href="/dashboard" className="mr-4">Dashboard</Link>
          <UserButton />
        </SignedIn>
        
        <SignedOut>
          {/* This content will only show when the user is signed out */}
          <SignInButton mode="modal" />
        </SignedOut>
      </div>
    </div>
  );
}