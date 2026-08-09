'use server';

import type {
  IAddToWishlist,
  IRemoveFromWishlist,
  IWishlistItem,
  RemoveFromWishlistResponse,
} from '../types/wishlist';
import { buildApiEndpoint } from '../utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '../utils/auth.utils';
import { API_HEADERS } from '../apis/headers.options';

export async function addToWishlist(data: IAddToWishlist): Promise<IAPIResponse<IWishlistItem>> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const endpoint = buildApiEndpoint('/wishlist', {});

  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add wishlist item');
  }

  const result = (await response.json()) as IAPIResponse<IWishlistItem>;

  if (!result.status) {
    throw new Error(result.message || 'Failed to add wishlist item');
  }

  return result;
}

export async function removeFromWishlist(
  data: IRemoveFromWishlist,
): Promise<IAPIResponse<IWishlistItem>> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const endpoint = buildApiEndpoint(`/wishlist/${data.productId}`);

  const response = await fetch(endpoint.toString(), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove wishlist item');
  }

  const result = (await response.json()) as IAPIResponse<IWishlistItem>;

  if (!result.status) {
    throw new Error(result.message || 'Failed to remove wishlist item');
  }

  return result;
}

export async function clearWishlist(): Promise<RemoveFromWishlistResponse> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const endpoint = buildApiEndpoint('/wishlist');
  const response = await fetch(endpoint.toString(), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to clear wishlist');
  }

  const result = (await response.json()) as RemoveFromWishlistResponse;

  if (!result.status) {
    throw new Error(result.message || 'Failed to clear wishlist');
  }

  return result;
}
