import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/reservations(.*)'])



export default clerkMiddleware(async (auth, req) => {
  // Only check authentication for protected routes
  if (isProtectedRoute(req)) {
    const { userId, redirectToSignIn } = await auth()
    
    if (!userId) {
      // Add custom logic to run before redirecting
      return redirectToSignIn()
    }
  }
  
  // Public routes will pass through without authentication checks
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}