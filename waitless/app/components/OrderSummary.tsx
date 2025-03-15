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

interface OrderItem extends MenuItem {
  quantity: number;
}

interface OrderConfirmation {
  orderId?: string;
  totalPrice: number;
  items: OrderItem[];
  timestamp: string;
}

interface OrderSummaryProps {
  orderItems: OrderItem[];
  totalPrice: number;
  orderSubmitted: boolean;
  orderConfirmation: OrderConfirmation | null;
  removeFromOrder: (itemName: string) => void;
  submitOrder: () => void;
  startNewOrder: () => void;
}

export default function OrderSummary({
  orderItems,
  totalPrice,
  orderSubmitted,
  orderConfirmation,
  removeFromOrder,
  submitOrder,
  startNewOrder
}: OrderSummaryProps) {
  return (
    <div className="md:col-span-6 lg:col-span-6 bg-gradient-to-br from-red-900/90 to-red-950/90 border border-red-800/50 shadow-md overflow-hidden relative rounded-lg">
      <div className="p-4">
        <h2 className="text-xl font-serif mb-4 text-orange-100 border-b border-red-800/50 pb-2">Your Order</h2>
        
        {orderSubmitted && orderConfirmation ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center bg-green-900/30 text-green-300 p-3 rounded-md">
              <div className="mr-2 text-xl">✓</div>
              <div>Order successfully placed!</div>
            </div>
            
            <div className="text-orange-100 text-sm">
              <div className="flex justify-between mb-2">
                <span>Order ID:</span>
                <span className="font-mono">{orderConfirmation.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{orderConfirmation.timestamp}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-orange-100 font-medium mb-2">Order Details:</h3>
              <ol className="list-decimal pl-5 space-y-1 text-orange-100">
                {orderConfirmation.items.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.quantity}x {item.name} - ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ol>
              <div className="mt-3 pt-2 border-t border-red-800/50 flex justify-between">
                <span className="text-orange-100 font-medium">Total:</span>
                <span className="text-orange-100 font-bold">${orderConfirmation.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={startNewOrder}
              className="bg-orange-700 hover:bg-orange-600 text-orange-50 border border-orange-600 shadow-md px-4 py-2 text-sm rounded-md w-full mt-3"
            >
              Start New Order
            </button>
          </div>
        ) : (
          <div className="h-36 overflow-y-auto custom-scrollbar">
            {orderItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-orange-300/70">
                <div className="mb-2 opacity-50 text-2xl">🍽️</div>
                <p>Your order is empty</p>
                <p className="text-sm mt-1">Select items from the menu below</p>
              </div>
            ) : (
              <div className="space-y-2">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-red-950/50 rounded-md">
                    <div className="flex items-center">
                      <span className="text-orange-100">{item.quantity}x</span>
                      <span className="ml-2 text-orange-100">{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-orange-100 mr-2">${(item.price * item.quantity).toFixed(2)}</span>
                      <button 
                        onClick={() => removeFromOrder(item.name)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-red-800/50">
                  <span className="text-orange-100 font-bold">Total:</span>
                  <span className="text-orange-100 font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="mt-4 text-center">
                  <button 
                    onClick={submitOrder}
                    className="bg-orange-700 hover:bg-orange-600 text-orange-50 border border-orange-600 shadow-md px-4 py-2 text-sm rounded-md w-full"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 