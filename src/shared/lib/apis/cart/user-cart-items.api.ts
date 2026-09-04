import type { ICartResponse } from '../../types/cart';

/**
 * Client-side cart read helper.
 * Calls GET /api/cart so the backend URL and access token stay on the server.
 * Cart mutations use Server Actions, not this module.
 */
export async function fetchCartItems(): Promise<ICartResponse> {
  const response = await fetch('/api/cart', {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }

  return response.json();
}
