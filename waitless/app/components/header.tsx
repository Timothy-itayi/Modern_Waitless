import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Header() {
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