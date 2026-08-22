import { NextResponse } from 'next/server';
import { removeWishlistItem } from '@/shared/lib/apis/wishlist/wishlist.api';

function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Internal Server Error';
  if (message === 'Unauthorized' || message === 'No token found') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await removeWishlistItem(id);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
