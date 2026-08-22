import type { IWishlistResponse } from '../../types/wishlist';

async function request(endpoint: string, init?: RequestInit): Promise<IWishlistResponse> {
  const response = await fetch(endpoint, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Wishlist request failed: ${response.status}`);
  }

  const data = (await response.json()) as IWishlistResponse;
  if (!data.status) {
    throw new Error(data.message || 'Wishlist request failed');
  }

  return data;
}

export function fetchWishlistItems(): Promise<IWishlistResponse> {
  return request('/api/wishlist');
}

export function addWishlistItem(productId: string): Promise<IWishlistResponse> {
  return request('/api/wishlist', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  });
}

export function clearWishlistItems(): Promise<IWishlistResponse> {
  return request('/api/wishlist', { method: 'DELETE' });
}

export function removeWishlistItem(id: string): Promise<IWishlistResponse> {
  return request(`/api/wishlist/${id}`, { method: 'DELETE' });
}
