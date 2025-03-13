'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  available: boolean;
}

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/restaurant-bg.jpg"
          alt="Restaurant background"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-50"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
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
        <div className="flex gap-4">
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

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black bg-opacity-50 p-4">
        <div className="flex justify-center items-center gap-8 text-white">
          <Link href="/menu" className="hover:text-gray-300 transition-colors">
            Menu
          </Link>
          <div className="h-4 w-px bg-white"></div>
          <Link href="/dashboard" className="hover:text-gray-300 transition-colors">
            Dashboard
          </Link>
          <div className="h-4 w-px bg-white"></div>
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About Us
          </Link>
          <div className="h-4 w-px bg-white"></div>
          <Link href="/contact" className="hover:text-gray-300 transition-colors">
            Contact
          </Link>
        </div>
      </div>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold mb-8">Our Menu</h1>
        
        {loading ? (
          <p>Loading menu...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
                <p className="text-sm mt-1">Category: {item.category}</p>
                {!item.available && <p className="text-red-500 mt-1">Currently unavailable</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}