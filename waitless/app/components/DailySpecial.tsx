'use client';

import React from 'react';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  available: boolean;
}

interface DailySpecialProps {
  isLoading: boolean;
  dailySpecial: MenuItem | null;
  addToOrder: (item: MenuItem) => void;
}

export default function DailySpecial({ 
  isLoading, 
  dailySpecial, 
  addToOrder 
}: DailySpecialProps) {
  return (
    <div className="md:col-span-3 lg:col-span-3 bg-gradient-to-br from-red-900/90 to-red-950/90 border border-red-800/50 shadow-md overflow-hidden relative rounded-lg">
      <div className="p-4">
        <h2 className="text-xl font-serif mb-4 text-orange-100 border-b border-red-800/50 pb-2">Today&apos;s Special</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-orange-100">Loading special...</div>
          </div>
        ) : dailySpecial ? (
          <div className="flex flex-col justify-between h-32 relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-20 rounded-md" 
                 style={{backgroundImage: `url(${dailySpecial.image_url})`}}></div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium text-orange-100">{dailySpecial.name}</h3>
              <p className="text-orange-200/80 text-sm mt-1 line-clamp-2">{dailySpecial.description}</p>
            </div>
            <div className="flex justify-between items-center relative z-10">
              <span className="text-orange-100 font-bold">${dailySpecial.price.toFixed(2)}</span>
              <button 
                className="bg-orange-700 hover:bg-orange-600 text-orange-50 border border-orange-600 shadow-md px-3 py-1 text-sm rounded-md"
                onClick={() => addToOrder(dailySpecial)}
              >
                Add to Order
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-32">
            <div className="text-orange-300/70">No special available today</div>
          </div>
        )}
      </div>
    </div>
  );
} 