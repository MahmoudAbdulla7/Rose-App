import { NextResponse } from 'next/server';

import {
  addWishlistItem,
  clearWishlistItems,
  getWishlistItems,
} from '@/shared/lib/apis/wishlist/wishlist.api';
import { handleApiRouteError } from '@/shared/lib/utils/api-route-error.utils';

export async function GET() {
  try {
    const data = await getWishlistItems();
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();
    const data = await addWishlistItem(productId);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}

export async function DELETE() {
  try {
    const data = await clearWishlistItems();
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}
