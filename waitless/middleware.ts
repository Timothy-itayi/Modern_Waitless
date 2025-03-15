import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/reservations(.*)',
  '/menu(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  
  // For debugging in production
  console.log(`Path: ${req.nextUrl.pathname}, userId: ${userId}`)
  
  // Only check authentication for protected routes
  if (isProtectedRoute(req)) {
    if (!userId) {
      // Redirect to sign-in page with a return_to parameter
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }
  }
  
  // Public routes will pass through without authentication checks
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|webp)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}