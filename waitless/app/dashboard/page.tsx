import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  // Get the auth session
  const { userId } = await auth()
  
  // If no user is authenticated, redirect to sign-in
  if (!userId) {
    redirect('/sign-in')
  }
  
  // Get the current user data
  const user = await currentUser()
  
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.firstName || 'Customer'}!</h1>
      <p className="text-gray-600 mb-8">Your personalized dining experience awaits.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Favorite Items</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
              <div>
                <h3 className="font-medium">Signature Pasta</h3>
                <p className="text-sm text-gray-500">Based on your previous orders</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
              <div>
                <h3 className="font-medium">Grilled Salmon</h3>
                <p className="text-sm text-gray-500">Popular with customers like you</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <p className="font-medium">Order #12345</p>
                <p className="text-sm text-gray-500">June 15, 2023</p>
              </div>
              <p className="text-sm">Margherita Pizza, Caesar Salad, Tiramisu</p>
            </div>
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <p className="font-medium">Order #12289</p>
                <p className="text-sm text-gray-500">May 28, 2023</p>
              </div>
              <p className="text-sm">Grilled Salmon, Roasted Vegetables</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Special Offers</h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <h3 className="font-medium text-yellow-800">20% Off Your Next Order</h3>
              <p className="text-sm text-yellow-700">Use code: WELCOME20</p>
              <p className="text-xs text-yellow-600 mt-2">Valid until July 31, 2023</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <h3 className="font-medium text-blue-800">Free Dessert</h3>
              <p className="text-sm text-blue-700">With any main course purchase</p>
              <p className="text-xs text-blue-600 mt-2">Weekdays only</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Reorder</h2>
          <div className="space-y-4">
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
              Reorder Favorite Meal
            </button>
            <Link href="/menu" className="block w-full text-center bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition-colors">
              Browse Full Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 