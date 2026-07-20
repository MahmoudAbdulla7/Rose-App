'use server';

import type { IAddToWishlist, IRemoveFromWishlist, IWishlistItem } from '../types/wishlist';
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

  return (await response.json()) as IAPIResponse<IWishlistItem>;
}

export async function removeFromWishlist(
  data: IRemoveFromWishlist,
): Promise<IAPIResponse<IWishlistItem>> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const endpoint = buildApiEndpoint('/wishlist', {
    productId: data.productId,
  });

  const response = await fetch(endpoint.toString(), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  return (await response.json()) as IAPIResponse<IWishlistItem>;
}
