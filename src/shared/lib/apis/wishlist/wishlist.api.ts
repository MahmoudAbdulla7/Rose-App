import 'server-only';

import type { IWishlistResponse } from '../../types/wishlist';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '../../utils/auth.utils';
import { API_HEADERS } from '../headers.options';

// Get
export async function getWishlistItems(): Promise<IWishlistResponse> {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint('/wishlist', {});
  const response = await fetch(endpoint.toString(), {
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  return (await response.json()) as IWishlistResponse;
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
