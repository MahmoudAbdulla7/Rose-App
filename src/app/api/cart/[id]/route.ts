import { NextResponse } from 'next/server';

import { removeCartItemById, updateCartItemById } from '@/shared/lib/apis/cart/cart.api';

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * BFF for a single cart line.
 * `id` is cartItems[].id (cart line id), not productId / product.id.
 */

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { status: false, code: 400, message: 'Missing cart item id' },
        { status: 400 },
      );
    }

    const body = (await request.json()) as { quantity?: number };

    // Quantity must stay at least 1 — removing an item uses DELETE instead
    if (typeof body.quantity !== 'number' || body.quantity < 1) {
      return NextResponse.json(
        { status: false, code: 400, message: 'Invalid quantity' },
        { status: 400 },
      );
    }

    const data = await updateCartItemById(id, body.quantity);
    return NextResponse.json(data, { status: data.status ? 200 : data.code });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';

    if (message === 'Unauthorized' || message === 'No token found') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { status: false, code: 400, message: 'Missing cart item id' },
        { status: 400 },
      );
    }

    // Remove only this cart line
    const data = await removeCartItemById(id);
    return NextResponse.json(data, { status: data.status ? 200 : data.code });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';

    if (message === 'Unauthorized' || message === 'No token found') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
