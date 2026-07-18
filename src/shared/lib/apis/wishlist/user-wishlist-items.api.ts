import type { IWishlistResponse } from '../../types/wishlist';

export async function fetchWishlistItems(): Promise<IWishlistResponse> {
  const response = await fetch('/api/wishlist');

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  return (await response.json()) as IWishlistResponse;
}
