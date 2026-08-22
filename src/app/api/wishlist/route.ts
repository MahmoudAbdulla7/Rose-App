import { NextResponse } from 'next/server';

import { getWishlistItems } from '@/shared/lib/apis/wishlist/wishlist.api';

export async function GET() {
  try {
    const data = await getWishlistItems();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';

    if (message === 'Unauthorized' || message === 'No token found') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
