import type { ICartItem, ICartResponse } from '../../types/cart';

/**
 * Client-side cart API helpers.
 * These call the Next.js BFF (/api/cart*), never the backend directly,
 * so the access token stays on the server.
 */

export async function fetchCartItems(): Promise<ICartResponse> {
  const response = await fetch('/api/cart');

  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }

  return (await response.json()) as ICartResponse;
}

export async function clearCartRequest(): Promise<IAPIResponse<null>> {
  const response = await fetch('/api/cart', { method: 'DELETE' });

  if (!response.ok) {
    throw new Error('Failed to clear cart');
  }

  return (await response.json()) as IAPIResponse<null>;
}

export async function updateCartItemRequest(
  id: string,
  quantity: number,
): Promise<IAPIResponse<ICartItem>> {
  // `id` = cartItems[].id
  const response = await fetch(`/api/cart/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }

  return (await response.json()) as IAPIResponse<ICartItem>;
}

export async function removeCartItemRequest(id: string): Promise<IAPIResponse<null>> {
  // `id` = cartItems[].id
  const response = await fetch(`/api/cart/${id}`, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error('Failed to remove cart item');
  }

  return (await response.json()) as IAPIResponse<null>;
}
