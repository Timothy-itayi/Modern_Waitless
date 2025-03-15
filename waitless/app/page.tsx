'use client';

import Link from 'next/link';
import Image from 'next/image';


export default function Home() {

  return (
    <div className="fixed inset-0 w-full h-full" style={{ overflow: 'hidden' }}>
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-img.jpg"
          alt="Restaurant background"
          width={1900}
          height={1000}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          className="brightness-50"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-4">WAITLESS</h1>
        
        <div className="text-2xl mb-8">
          <h2 className="font-light italic mb-4">WE SERVE FOOD</h2>
          <h2 className="text-7xl font-bold mb-4">WITH LOVE</h2>
        </div>

        <p className="max-w-2xl mx-auto text-lg mb-12">
          Waitless, your place for delicious food in the heart of your city. 
          Located at Downtown Street 123, we love serving homemade dishes that are 
          perfect for sharing with family, friends or colleagues.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/menu"
            className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            View Menu
          </Link>
          <Link 
            href="/reservations"
            className="bg-black bg-opacity-50 text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-70 transition-colors border border-white"
          >
            Book a Table
          </Link>
       
        </div>
      </div>
    </div>
  );
}
 
