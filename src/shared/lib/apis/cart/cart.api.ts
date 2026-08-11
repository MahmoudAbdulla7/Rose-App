import 'server-only';

import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '../../utils/auth.utils';
import { API_HEADERS } from '../headers.options';
import type { ICartResponse } from '../../types/cart';

export async function getCartItems(): Promise<ICartResponse> {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint('/cart', {});
  const response = await fetch(endpoint.toString(), {
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  return (await response.json()) as ICartResponse;
}

export async function addCartItem(productId: string, quantity: number): Promise<ICartResponse> {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint('/cart', {});
  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) throw new Error('Failed to add cart item');
  return (await response.json()) as ICartResponse;
}

export async function updateCartItemQuantity(id: string, quantity: number): Promise<ICartResponse> {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint(`/cart/${id}`, {});
  const response = await fetch(endpoint.toString(), {
    method: 'PATCH',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) throw new Error('Failed to update cart item');
  return (await response.json()) as ICartResponse;
}

export async function removeCartItem(id: string): Promise<ICartResponse> {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint(`/cart/${id}`, {});
  const response = await fetch(endpoint.toString(), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  if (!response.ok) throw new Error('Failed to remove item from cart');
  return (await response.json()) as ICartResponse;
}
