import 'server-only';
import type { ICartResponse } from '../../types/cart';
import { getNextAuthToken } from '../../utils/auth.utils';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { API_HEADERS } from '../headers.options';

export async function getCartItems(): Promise<ICartResponse> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const endpoint = buildApiEndpoint('/cart', {});

  const response = await fetch(endpoint.toString(), {
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  return (await response.json()) as ICartResponse;
}
