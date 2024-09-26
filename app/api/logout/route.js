// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  // Create a response object
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear the token cookie by setting maxAge to 0
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure the secure flag is set only in production
    path: '/',
    maxAge: 0, // Expires immediately
    sameSite: 'lax', // Consider using 'strict' for sensitive cookies
  });

  // Get the origin of the current request to construct an absolute URL
  const origin = req.nextUrl.origin || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Redirect to the login page after clearing cookies
  return NextResponse.redirect(`${origin}/login`);
}
