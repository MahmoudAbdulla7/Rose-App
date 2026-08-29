import { getCartItems } from '@/shared/lib/apis/cart/cart.api';
import { handleApiRouteError } from '@/shared/lib/utils/api-route-error.utils';
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
    return handleApiRouteError(error);
  }
}
