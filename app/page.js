//app/page.js
'use client'; // Necessary for client-side rendering

import { useRouter } from 'next/navigation'; // Correct import
import { useEffect, useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null as initial state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/checkAuth');
        if (res.ok) {
          setIsAuthenticated(true);  // User is authenticated
          router.replace('/intro');  // Use replace instead of push for redirection
        } else {
          setIsAuthenticated(false); // User is not authenticated
          router.replace('/login');  // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);  // Handle network or other errors
        router.replace('/login');    // Redirect to login on error
      }
    };

    checkAuth(); // Run the authentication check when the component mounts
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  // Return null as the user will be redirected and no other content needs to be displayed
  return null;
}
