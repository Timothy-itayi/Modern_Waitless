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

interface MenuItemCardProps {
  item: MenuItem;
  addToOrder: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, addToOrder }: MenuItemCardProps) {
  return (
    <div className="bg-red-950/50 rounded-lg p-3 border border-red-800/50 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex mb-2">
        <div className="w-16 h-16 rounded overflow-hidden shadow-sm mr-3 flex-shrink-0">
          <img 
            src={item.image_url || "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=100"} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-orange-100">{item.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-orange-400 text-xs">★</span>
              ))}
            </div>
            <span className="text-orange-300 text-xs ml-1">(24)</span>
          </div>
          <span className="text-orange-100 font-semibold">${item.price.toFixed(2)}</span>
        </div>
      </div>
      <p className="text-sm text-orange-200/70 mb-3 line-clamp-2">
        {item.description}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-1">
          <span className="text-xs px-2 py-0.5 bg-red-900/50 text-orange-200 rounded-full capitalize">
            {item.category}
          </span>
          {item.available ? (
            <span className="text-xs px-2 py-0.5 bg-green-900/50 text-green-200 rounded-full">
              Available
            </span>
          ) : (
            <span className="text-xs px-2 py-0.5 bg-red-800/50 text-red-200 rounded-full">
              Unavailable
            </span>
          )}
        </div>
        <button
          className={`${
            item.available 
              ? 'bg-orange-700 hover:bg-orange-600 text-orange-50 border border-orange-600' 
              : 'bg-gray-700 text-gray-300 cursor-not-allowed border border-gray-600'
          } shadow-sm px-3 py-1 text-sm rounded-md`}
          onClick={() => item.available && addToOrder(item)}
          disabled={!item.available}
        >
          Add
        </button>
      </div>
    </div>
  );
} 