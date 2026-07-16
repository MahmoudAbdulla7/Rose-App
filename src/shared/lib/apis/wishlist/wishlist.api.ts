'use server';

import type { IWishlistResponse } from '../../types/wishlist';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '../../utils/auth.utils';
import { API_HEADERS } from '../headers.options';

export async function getWishlistItems(): Promise<IWishlistResponse> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const endpoint = buildApiEndpoint('/wishlist', {});

  const response = await fetch(endpoint.toString(), {
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  return (await response.json()) as IWishlistResponse;
}
