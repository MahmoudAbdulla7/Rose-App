import 'server-only';

import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '../../utils/auth.utils';
import { API_HEADERS } from '../headers.options';
import type { ICartResponse } from '../../types/cart';

async function getAuthHeaders() {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');

  return {
    ...API_HEADERS.JSON,
    ...API_HEADERS.AUTHORIZATION(token.accessToken),
  };
}

async function parseCartResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  const data = (await response.json()) as { status?: boolean; message?: string };

  if (!response.ok || data.status === false) {
    throw new Error(data.message || fallbackMessage);
  }

  return data as T;
}

export async function getCartItems(): Promise<ICartResponse> {
  const headers = await getAuthHeaders();
  const endpoint = buildApiEndpoint('/cart', {});
  const response = await fetch(endpoint.toString(), { headers });

  return (await response.json()) as ICartResponse;
}

export async function addCartItem(productId: string, quantity: number): Promise<ICartResponse> {
  const headers = await getAuthHeaders();
  const endpoint = buildApiEndpoint('/cart', {});
  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers,
    body: JSON.stringify({ productId, quantity }),
  });

  return parseCartResponse<ICartResponse>(response, 'Failed to add cart item');
}

export async function updateCartItemQuantity(id: string, quantity: number): Promise<ICartResponse> {
  const headers = await getAuthHeaders();
  const endpoint = buildApiEndpoint(`/cart/${id}`, {});
  const response = await fetch(endpoint.toString(), {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ quantity }),
  });

  return parseCartResponse<ICartResponse>(response, 'Failed to update cart item');
}

export async function removeCartItem(id: string): Promise<ICartResponse> {
  const headers = await getAuthHeaders();
  const endpoint = buildApiEndpoint(`/cart/${id}`, {});
  const response = await fetch(endpoint.toString(), {
    method: 'DELETE',
    headers,
  });

  return parseCartResponse<ICartResponse>(response, 'Failed to remove item from cart');
}

export async function clearCartItems(): Promise<IAPIResponse<null>> {
  const headers = await getAuthHeaders();
  const cart = await getCartItems();

  if (!cart.status || !cart.payload?.cartItems?.length) {
    return {
      status: true,
      code: 200,
      message: 'Cart already empty',
      payload: null,
    };
  }

  // Backend has no bulk-clear endpoint — delete each cart line by its id
  await Promise.all(
    cart.payload.cartItems.map(async (item) => {
      const endpoint = buildApiEndpoint(`/cart/${item.id}`, {});
      const response = await fetch(endpoint.toString(), {
        method: 'DELETE',
        headers,
      });

      await parseCartResponse(response, 'Failed to clear cart');
    }),
  );

  return {
    status: true,
    code: 200,
    message: 'Cart cleared',
    payload: null,
  };
}
