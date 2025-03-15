import { ClerkProvider } from '@clerk/nextjs'
import { type Metadata } from 'next'
import Header from '@/app/components/header'
import './globals.css'

export const metadata: Metadata = {
  title: 'Waitless App',
  description: 'Manage your restaurant waitlist efficiently',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="min-h-screen bg-gray-50">  
          <header className="flex justify-end items-center p-4 gap-4 h-16 bg-transparent shadow-sm z-50 relative">
            <Header />
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </body>
      </ClerkProvider>
    </html>
  )
}