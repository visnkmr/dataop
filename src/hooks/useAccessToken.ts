import { useState, useEffect } from 'react';

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/auth/token');
        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.accessToken);
          
          // Test function: Log JWT token to console
          console.log('🔐 Token Received from Backend:');
          console.log('Token:', data.accessToken);
          console.log('Token Length:', data.accessToken.length);
          console.log('Is JWT:', data.isJWT);
          
          if (data.isJWT) {
            try {
              console.log('Token Payload:', JSON.parse(atob(data.accessToken.split('.')[1])));
            } catch (e) {
              console.log('❌ Failed to decode JWT payload');
            }
          } else {
            console.log('⚠️ This is NOT a JWT token - likely an opaque token');
            console.log('💡 To get JWT tokens, ensure AUTH0_AUDIENCE is set correctly');
          }
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { accessToken, isLoading };
};

// Test function to decode and display JWT token details
export const decodeJWT = (token: string) => {
  try {
    const parts = token.split('.');
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    
    console.log('📋 JWT Token Details:');
    console.log('Header:', header);
    console.log('Payload:', payload);
    console.log('Expiration:', new Date(payload.exp * 1000).toLocaleString());
    console.log('Issued At:', new Date(payload.iat * 1000).toLocaleString());
    
    return { header, payload };
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};