import type { IWishlistResponse } from '../../types/wishlist';

type FetchWishlistItemsOptions = {
  origin?: string;
  cookie?: string;
  cache?: RequestCache;
};

export async function fetchWishlistItems(
  options: FetchWishlistItemsOptions = {},
): Promise<IWishlistResponse> {
  const endpoint = options.origin
    ? new URL('/api/wishlist', options.origin).toString()
    : '/api/wishlist';

  const response = await fetch(endpoint, {
    cache: options.cache,
    headers: options.cookie
      ? {
          cookie: options.cookie,
        }
      : undefined,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  return (await response.json()) as IWishlistResponse;
}
