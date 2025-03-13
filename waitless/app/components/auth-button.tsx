'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export default function AuthButton() {
  const { isSignedIn, signOut } = useAuth();
  
  if (isSignedIn) {
    return (
      <button 
        onClick={() => signOut()} 
        className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
      >
        Sign Out
      </button>
    );
  }
  
  return (
    <Link 
      href="/sign-in" 
      className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
    >
      Sign In
    </Link>
  );
} 