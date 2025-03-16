import Image from 'next/image';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';


import { InfiniteMovingSlogans } from './components/InfiniteMovingSlogans';
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function Home() {


  const { userId } = await auth();
  
  // If no user is authenticated, redirect to sign-in
  if (!userId) {
    console.log("user not signed it ")
  }
  
  // Get the current user data
  const user = await currentUser();

  
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
        
          <h1 className="text-8xl font-extrabold mb-4 tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text px-4 py-2 backdrop-blur-sm rounded-xl border border-white/20">WAITLESS</h1>
          
        
          {/* Infinite Moving Slogans */}
          <div className="mb-8 w-screen -mx-4 overflow-hidden">
            <InfiniteMovingSlogans items={slogans} speed="slow" />
          </div>
        </div>
       
        <SignedIn>
          <p className="max-w-md mx-auto text-lg mb-12 bg-white/90 backdrop-blur-sm text-gray-800 py-3 px-6 rounded-lg shadow-md font-medium">
            Hey <span className="text-indigo-600 font-bold">{user?.firstName}</span>!
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
 
