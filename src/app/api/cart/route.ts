import { getCartItems } from '@/shared/lib/apis/cart/cart.api';
import { NextResponse } from 'next/server';

/**
 * Authenticated cart read for client-side React Query.
 *
 * This stays a Route Handler (not a Server Action) so the client can GET
 * `/api/cart` without exposing the backend URL or access token. Cart writes
 * go through Server Actions instead.
 */
export async function GET() {
  try {
    const data = await getCartItems();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    if (message === 'Unauthorized' || message === 'No token found') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
