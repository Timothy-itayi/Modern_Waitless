'use client';

import React from 'react';
import MenuItemCard from './MenuItemCard';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  available: boolean;
}

interface MenuListProps {
  isLoading: boolean;
  error: string | null;
  filteredMenuItems: MenuItem[];
  addToOrder: (item: MenuItem) => void;
}

export default function MenuList({
  isLoading,
  error,
  filteredMenuItems,
  addToOrder
}: MenuListProps) {
  return (
    <div className="col-span-12 bg-gradient-to-br from-red-900/90 to-red-950/90 border border-red-800/50 shadow-md overflow-hidden relative rounded-lg">
      <div className="p-4">
        <h2 className="text-xl font-serif mb-4 text-orange-100 border-b border-red-800/50 pb-2">
          Menu Items
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-orange-100">Loading menu items...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-red-300">{error}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredMenuItems.map((item, index) => (
              <MenuItemCard key={index} item={item} addToOrder={addToOrder} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 