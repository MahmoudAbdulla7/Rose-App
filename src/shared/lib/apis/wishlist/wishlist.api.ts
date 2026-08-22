import 'server-only';

import type { IWishlistResponse, WishlistSuccessResponse } from '../../types/wishlist';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '../../utils/auth.utils';
import { API_HEADERS } from '../headers.options';

export async function getWishlistItems(): Promise<WishlistSuccessResponse> {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint('/wishlist', {});
  const response = await fetch(endpoint.toString(), {
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  const data = (await response.json()) as WishlistSuccessResponse;

  if (!data.status) {
    throw new Error(data.message || 'Failed to fetch wishlist');
  }

  return data;
}

// Add
export async function addWishlistItem(productId: string): Promise<IWishlistResponse> {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint('/wishlist', {});
  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) throw new Error('Failed to add wishlist item');
  return (await response.json()) as IWishlistResponse;
}

// Remove
export async function removeWishlistItem(productId: string): Promise<IWishlistResponse> {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint(`/wishlist/${productId}`, {});
  const response = await fetch(endpoint.toString(), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  if (!response.ok) throw new Error('Failed to remove wishlist item');
  return (await response.json()) as IWishlistResponse;
}

export async function clearWishlistItems(): Promise<IWishlistResponse> {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint('/wishlist', {});
  const response = await fetch(endpoint.toString(), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  if (!response.ok) throw new Error('Failed to clear wishlist');
  return (await response.json()) as IWishlistResponse;
}
