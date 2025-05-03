"use client";

import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function TokenValidator() {
  const { setUser, setIsLoggedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if we're coming from an expired session
    if (searchParams.get('session_expired') === 'true') {
      // Clear the user context
      setUser(null);
      setIsLoggedIn(false);
      
      // Remove the query parameter
      const params = new URLSearchParams(searchParams.toString());
      params.delete('session_expired');
      
      // Replace the URL without the query parameter
      const newUrl = pathname + (params.toString() ? `?${params.toString()}` : '');
      router.replace(newUrl);
      
      // Show a notification to the user (you can use your preferred notification system)
      //alert('Your session has expired. Please log in again.'); AQUI PONER TOAST DE SESSION EXPIRADA O ERROR EN TOKEN VALIDACION
    }
  }, [pathname, searchParams, router]);

  return null; // This component doesn't render anything
}