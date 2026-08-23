import { NextResponse } from 'next/server';
import { updateCartItemQuantity, removeCartItem } from '@/shared/lib/apis/cart/cart.api';
import { handleApiRouteError } from '@/shared/lib/utils/api-route-error.utils';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { quantity } = await request.json();
    const data = await updateCartItemQuantity(id, quantity);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await removeCartItem(id);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}
