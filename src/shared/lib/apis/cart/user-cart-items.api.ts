import type { ICartResponse } from '../../types/cart';

export async function fetchCartItems(): Promise<ICartResponse> {
  const response = await fetch('/api/cart');

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  return (await response.json()) as ICartResponse;
}
