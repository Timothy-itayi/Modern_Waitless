import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Waitless - Skip the Wait',
  description: 'Order food and make reservations without the wait',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} 
                  afterSignOutUrl="/">
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="bg-black text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">Waitless</Link>
              <div className="flex items-center gap-4">
                <UserButton />
              </div>
            </div>
          </header>
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}