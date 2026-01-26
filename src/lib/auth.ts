import { getAccessToken } from '@auth0/nextjs-auth0';

export async function getServerSideAccessToken() {
  try {
    const accessToken = await getAccessToken();
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}