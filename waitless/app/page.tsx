'use client';

import Image from 'next/image';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { InfiniteMovingSlogans } from './components/InfiniteMovingSlogans';

export default function Home() {
  const slogans = [
    "Why wait when you can waitless?",
    "Food at the speed of thought.",
    "Skip the line, save your time.",
    "Order ahead, eat instead.",
    "Fast food, faster service.",
    "Your meal is just a tap away.",
    "No waiting, just eating.",
    "From kitchen to table in record time.",
    "Time is precious, so is your appetite.",
    "The fastest way from hungry to happy."
  ];

  return (
    <div className="fixed inset-0 w-full h-full" style={{ overflow: 'hidden' }}>
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-img.jpeg"
          alt="Restaurant background"
          width={2000}
          height={2000}
          style={{ objectFit: 'cover' }}
          className="brightness-70"
          unoptimized
        />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
        <div>
          <h1 className="text-6xl font-bold mb-4 Title-font bg-[transparent] backdrop-blur-sm">WAITLESS</h1>
          
          {/* Infinite Moving Slogans */}
          <div className="mb-8 w-full">
            <InfiniteMovingSlogans items={slogans} speed="slow" />
          </div>
        </div>
       
        <SignedIn>
          <p className="max-w-2xl mx-auto text-lg mb-12 text-black bg-white">
            Welcome back! Ready to order?
          </p>
          
       
        </SignedIn>

        {/* Conditional text based on sign-in status */}
        <SignedOut>
          <div className="flex items-center justify-center max-w-2xl mx-auto text-lg mb-6 text-black p-3 ">
            <div className="mr-3">
              <SignInButton mode="modal">
                <button className="btn-23">
                  <span className="text">Sign In</span>
                  <span className="marquee">Sign In</span>
                </button>
              </SignInButton>
            </div>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
 
