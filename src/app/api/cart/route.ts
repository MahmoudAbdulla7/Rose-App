import { addCartItem, getCartItems } from '@/shared/lib/apis/cart/cart.api';
import { handleApiRouteError } from '@/shared/lib/utils/api-route-error.utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getCartItems();
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();
    const data = await addCartItem(productId, quantity);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}
