'use client';

import React, { useState, useEffect } from 'react';
import CategoryFilter from './CategoryFilter';
import OrderSummary from './OrderSummary';
import MenuList from './MenuList';
import { MenuItem, OrderItem, OrderConfirmation } from '../types/menu';

interface MenuDisplayProps {
  userId: string;
  userName: string;
}

export default function MenuDisplay({ userId, userName }: MenuDisplayProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching menu items from API...');
        
        let data;
        try {
          const response = await fetch('/api/menu');
          
          if (!response.ok) {
            console.error(`API error: ${response.status} ${response.statusText}`);
            throw Error(`Failed to fetch menu items: ${response.status}`);
          }
          
          data = await response.json();
        } catch (fetchError) {
          console.error('Fetch error, using fallback data:', fetchError);
          // Fallback to hardcoded data if API fails
          data = getFallbackMenuItems();
        }
        
        console.log('Raw API response:', data);
        
        // Handle different response formats
        let processedMenuItems: MenuItem[] = [];
        
        if (Array.isArray(data)) {
          processedMenuItems = data;
          console.log('Data is an array with length:', data.length);
        } else if (data && typeof data === 'object') {
          // If it's an object, check if it has a property that might contain the menu items
          const possibleArrayProps = Object.keys(data).filter(key => Array.isArray(data[key]));
          console.log('Possible array properties:', possibleArrayProps);
          
          if (possibleArrayProps.length > 0) {
            // Use the first array property found
            processedMenuItems = data[possibleArrayProps[0]];
            console.log('Using array from property:', possibleArrayProps[0]);
          } else {
            // If no array properties, treat the object itself as a single menu item
            processedMenuItems = [data as MenuItem];
            console.log('Treating object as a single menu item');
          }
        }
        
        if (processedMenuItems.length === 0) {
          // If still empty, use fallback data
          processedMenuItems = getFallbackMenuItems();
          console.log('Using fallback menu items');
        }
        
        console.log('Processed menu items:', processedMenuItems);
        setMenuItems(processedMenuItems);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu. Please try again later.');
        // Set fallback menu items
        setMenuItems(getFallbackMenuItems());
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Get unique categories from menu items
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  // Filter menu items by category
  const filteredMenuItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Add item to order
  const addToOrder = (item: MenuItem) => {
    setOrderItems(prevItems => {
      // Check if item already exists in order
      const existingItemIndex = prevItems.findIndex(orderItem => orderItem.name === item.name);
      
      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add it with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from order
  const removeFromOrder = (itemName: string) => {
    setOrderItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.name === itemName);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        if (updatedItems[existingItemIndex].quantity > 1) {
          // Decrease quantity if more than 1
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity - 1
          };
        } else {
          // Remove item if quantity is 1
          updatedItems.splice(existingItemIndex, 1);
        }
        return updatedItems;
      }
      return prevItems;
    });
  };

  // Calculate total price
  const totalPrice = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Submit order
  const submitOrder = async () => {
    if (orderItems.length === 0) return;
    
    try {
      const orderData = {
        userId,
        customerName: userName,
        items: orderItems,
        totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      console.log('Submitting order:', orderData);
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw Error(`Failed to submit order: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();
      console.log('Order submission response:', responseData);
      
      // Store order confirmation details
      setOrderConfirmation({
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        totalPrice,
        items: [...orderItems],
        timestamp: new Date().toLocaleString()
      });
      
      // Set order as submitted
      setOrderSubmitted(true);
      
    } catch (err) {
      console.error('Error submitting order:', err);
      alert('Failed to submit order. Please try again.');
    }
  };

  // Start a new order
  const startNewOrder = () => {
    setOrderItems([]);
    setOrderSubmitted(false);
    setOrderConfirmation(null);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Category Filter */}
      <div className="col-span-12 md:col-span-3 lg:col-span-3 bg-gradient-to-br from-red-900/90 to-red-950/90 border border-red-800/50 shadow-md overflow-hidden relative rounded-lg">
        <div className="p-4">
          <h2 className="text-xl font-serif mb-4 text-orange-100 border-b border-red-800/50 pb-2">Menu</h2>
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
        </div>
      </div>
 
      {/* Order Summary */}
      <OrderSummary 
        orderItems={orderItems}
        totalPrice={totalPrice}
        orderSubmitted={orderSubmitted}
        orderConfirmation={orderConfirmation}
        removeFromOrder={removeFromOrder}
        submitOrder={submitOrder}
        startNewOrder={startNewOrder}
      />
      
      {/* Menu Items */}
      <MenuList 
        isLoading={isLoading}
        error={error}
        filteredMenuItems={filteredMenuItems}
        addToOrder={addToOrder}
      />
      
      {/* Debug Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="col-span-12 bg-gray-900 p-4 rounded-lg text-xs text-gray-300 font-mono">
          <details>
            <summary className="cursor-pointer">Debug Info</summary>
            <div className="mt-2 overflow-auto max-h-40">
              <p>Menu Items: {menuItems.length}</p>
              <p>Categories: {categories.join(', ')}</p>
              <p>Active Category: {activeCategory}</p>
              <p>Filtered Items: {filteredMenuItems.length}</p>
              <p>Order Items: {orderItems.length}</p>
              <pre>{JSON.stringify({ menuItems: menuItems.slice(0, 2) }, null, 2)}</pre>
              <pre>{JSON.stringify({ rawData: menuItems }, null, 2)}</pre>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

function getFallbackMenuItems(): MenuItem[] {
  return [
    {
      name: "Pad Thai",
      price: 14.99,
      description: "Stir-fried rice noodles with eggs, tofu, bean sprouts, and peanuts in a sweet and savory sauce",
      category: "mains",
      image_url: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=200",
      available: true
    },
    {
      name: "Tom Yum Goong",
      price: 16.95,
      description: "Authentic Thai spicy shrimp soup with lemongrass, lime leaves, and chili",
      category: "soups",
      image_url: "https://images.unsplash.com/photo-1569562211093-4a0b93f39ffb?q=80&w=200",
      available: true
    },
    {
      name: "Green Curry",
      price: 15.99,
      description: "Spicy curry with coconut milk, bamboo shoots, eggplant, and Thai basil",
      category: "mains",
      image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=200",
      available: true
    },
    {
      name: "Mango Sticky Rice",
      price: 8.99,
      description: "Sweet sticky rice with fresh mango and coconut cream",
      category: "desserts",
      image_url: "https://images.unsplash.com/photo-1621236378699-8597faf6a11a?q=80&w=200",
      available: true
    },
    {
      name: "Thai Iced Tea",
      price: 4.99,
      description: "Sweet tea with condensed milk and spices served over ice",
      category: "drinks",
      image_url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=200",
      available: true
    }
  ];
} 