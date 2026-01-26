import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async function handler(req, res) {
  try {
    console.log('🔐 Attempting to get Auth0 access token...');
    console.log('📋 AUTH0_AUDIENCE:', process.env.AUTH0_AUDIENCE);
    
    const accessToken = await getAccessToken();
    
    if (accessToken && accessToken.accessToken) {
      const token = accessToken.accessToken;
      console.log('✅ Access token received');
      console.log('🔑 Token type check - starts with ey?', token.startsWith('eyJ'));
      console.log('📏 Token length:', token.length);
      
      // Try to decode as JWT to see if it's a valid JWT
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          console.log('📋 JWT Payload:', payload);
          console.log('✅ This is a valid JWT token');
        } else {
          console.log('⚠️ This is not a JWT format (not 3 parts separated by dots)');
        }
      } catch (decodeError: any) {
        console.log('❌ Token is not a valid JWT:', decodeError?.message || decodeError);
      }
      
      return Response.json({ 
        accessToken: token,
        isJWT: token.includes('.') && token.split('.').length === 3
      });
    } else {
      console.log('❌ No access token received');
      return Response.json({ error: 'No access token available' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('❌ Error getting access token:', error);
    return Response.json({ error: 'Failed to get access token', details: error?.message || 'Unknown error' }, { status: 500 });
  }
});