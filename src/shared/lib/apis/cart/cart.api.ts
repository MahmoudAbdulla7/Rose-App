import 'server-only';

import type { ICartItem, ICartResponse } from '../../types/cart';
import { getNextAuthToken } from '../../utils/auth.utils';
import { buildApiEndpoint } from '../../utils/api-endpoint-builder.utils';
import { API_HEADERS } from '../headers.options';

// Shared auth headers for every backend cart call
async function getAuthHeaders() {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  return {
    ...API_HEADERS.JSON,
    ...API_HEADERS.AUTHORIZATION(token.accessToken),
  };
}

export async function getCartItems(): Promise<ICartResponse> {
  const headers = await getAuthHeaders();
  const endpoint = buildApiEndpoint('/cart', {});

  const response = await fetch(endpoint.toString(), { headers });

  return (await response.json()) as ICartResponse;
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
      await fetch(endpoint.toString(), {
        method: 'DELETE',
        headers,
      });
    }),
  );

  return {
    status: true,
    code: 200,
    message: 'Cart cleared',
    payload: null,
  };
}

export async function updateCartItemById(
  id: string,
  quantity: number,
): Promise<IAPIResponse<ICartItem>> {
  if (!id) {
    return {
      status: false,
      code: 400,
      message: 'Missing cart item id',
    };
  }

  const headers = await getAuthHeaders();
  // `id` is the cart line id from cartItems[].id
  const endpoint = buildApiEndpoint(`/cart/${id}`, {});

  const response = await fetch(endpoint.toString(), {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
    headers,
  });

  return (await response.json()) as IAPIResponse<ICartItem>;
}

export async function removeCartItemById(id: string): Promise<IAPIResponse<null>> {
  if (!id) {
    return {
      status: false,
      code: 400,
      message: 'Missing cart item id',
    };
  }

  const headers = await getAuthHeaders();
  // `id` is the cart line id from cartItems[].id
  const endpoint = buildApiEndpoint(`/cart/${id}`, {});

  const response = await fetch(endpoint.toString(), {
    method: 'DELETE',
    headers,
  });

  const data = (await response.json()) as IAPIResponse<ICartItem | null>;

  return {
    status: data.status,
    code: data.code,
    message: data.message,
    payload: null,
  };
}
