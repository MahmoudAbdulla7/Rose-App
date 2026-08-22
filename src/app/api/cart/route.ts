import { NextResponse } from 'next/server';

import { clearCartItems, getCartItems } from '@/shared/lib/apis/cart/cart.api';

/**
 * BFF for the cart collection.
 * Keeps the backend access token on the server and exposes a same-origin
 * /api/cart surface for React Query client calls (same pattern as /api/wishlist).
 */

export async function GET() {
  try {
    // Fetch the authenticated user's cart from the backend API
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

export async function DELETE() {
  try {
    // Clear every cart line for the current user
    const data = await clearCartItems();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';

    if (message === 'Unauthorized' || message === 'No token found') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
