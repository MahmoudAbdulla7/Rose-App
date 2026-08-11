import { addCartItem, getCartItems } from '@/shared/lib/apis/cart/cart.api';
import { NextResponse } from 'next/server';

function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Internal Server Error';
  if (message === 'Unauthorized' || message === 'No token found') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}

export async function GET() {
  try {
    const data = await getCartItems();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();
    const data = await addCartItem(productId, quantity);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
