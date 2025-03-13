import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server';

// Only apply Clerk middleware if Clerk keys are present
const middleware = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY 
  ? clerkMiddleware()
  : (_req: NextRequest) => NextResponse.next();

export default middleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};