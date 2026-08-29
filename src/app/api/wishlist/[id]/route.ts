import { NextResponse } from 'next/server';
import { removeWishlistItem } from '@/shared/lib/apis/wishlist/wishlist.api';
import { handleApiRouteError } from '@/shared/lib/utils/api-route-error.utils';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await removeWishlistItem(id);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}
