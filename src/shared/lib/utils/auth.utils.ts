import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export const getNextAuthToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.NEXT_AUTH_SESSION_COOKIE!)?.value;

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const decodedToken = decode({ token, secret: process.env.NEXTAUTH_SECRET! });
    return decodedToken;
  } catch (error) {
    void error;
    return null;
  }
};
