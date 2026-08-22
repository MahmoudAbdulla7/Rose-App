import { NextResponse } from 'next/server';

import { addWishlistItem, getWishlistItems } from '@/shared/lib/apis/wishlist/wishlist.api';

function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Internal Server Error';
  if (message === 'Unauthorized' || message === 'No token found') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}

export async function GET() {
  try {
    const data = await getWishlistItems();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();
    const data = await addWishlistItem(productId);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
