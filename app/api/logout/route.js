// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear the token cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0, // Expires immediately
  });

  // Redirect to the login page (absolute URL)
  const baseURL = process.env.NEXT_PRIVATE_BASE_URL || 'http://localhost:3000'; // Fallback to localhost if environment variable is not set
  return NextResponse.redirect(`${baseURL}/login`);
}
