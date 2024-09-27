// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  // Create a response object
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear the token cookie by setting maxAge to -1 to expire immediately
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',  // Ensure the path matches where the cookie is set
    maxAge: -1, // Expires immediately
    sameSite: 'lax',
  });

  // Get the origin of the current request to construct an absolute URL
  const origin = req.nextUrl.origin || process.env.NEXT_PRIVATE_BASE_URL || 'http://localhost:3000';

  // Redirect to the login page using a 303 redirect to handle POST-to-GET correctly
  return NextResponse.redirect(`${origin}/login`, 303);
}

