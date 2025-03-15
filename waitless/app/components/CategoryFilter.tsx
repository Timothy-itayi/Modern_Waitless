'use client';

import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}: CategoryFilterProps) {
  // Split categories into two rows for better display
  const firstRowCategories = categories.slice(0, 3);
  const secondRowCategories = categories.slice(3, 6);

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {firstRowCategories.map((category) => (
          <button 
            key={category}
            className={`py-2 px-1 rounded-md ${activeCategory === category ? 'bg-red-800 text-orange-100' : 'bg-red-900/50 text-orange-100 hover:bg-red-800'}`}
            onClick={() => setActiveCategory(category)}
          >
            <div className="flex flex-col items-center py-1">
              <span className="text-xs mt-1 capitalize">{category}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {secondRowCategories.map((category) => (
          <button 
            key={category}
            className={`py-2 px-1 rounded-md ${activeCategory === category ? 'bg-red-800 text-orange-100' : 'bg-red-900/50 text-orange-100 hover:bg-red-800'}`}
            onClick={() => setActiveCategory(category)}
          >
            <div className="flex flex-col items-center py-1">
              <span className="text-xs mt-1 capitalize">{category}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 