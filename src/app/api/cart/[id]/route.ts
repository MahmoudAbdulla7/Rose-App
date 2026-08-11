import { NextResponse } from 'next/server';
import { updateCartItemQuantity, removeCartItem } from '@/shared/lib/apis/cart/cart.api';

function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Internal Server Error';
  if (message === 'Unauthorized' || message === 'No token found') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { quantity } = await request.json();
    const data = await updateCartItemQuantity(id, quantity);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await removeCartItem(id);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
