import type { ICartResponse } from '../../types/cart';

async function request(endpoint: string, init?: RequestInit): Promise<ICartResponse> {
  const response = await fetch(endpoint, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Cart request failed: ${response.status}`);
  }

  return response.json();
}

export function fetchCartItems(): Promise<ICartResponse> {
  return request('/api/cart');
}

export function addCartItem(productId: string, quantity: number): Promise<ICartResponse> {
  return request('/api/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

export function updateCartItemQuantity(id: string, quantity: number): Promise<ICartResponse> {
  return request(`/api/cart/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(id: string): Promise<ICartResponse> {
  return request(`/api/cart/${id}`, { method: 'DELETE' });
}
