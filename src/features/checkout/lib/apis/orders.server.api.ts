import 'server-only';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type { ICreateOrderPayload, ICreateOrderResponse } from '../types/order';

export async function createOrder(payload: ICreateOrderPayload): Promise<ICreateOrderResponse> {
  const token = await getNextAuthToken();
  if (!token?.accessToken) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint('/orders', {});
  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken as string),
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ICreateOrderResponse;

  if (!response.ok || !data.status) {
    throw new Error(!data.status ? data.message : 'Failed to create order');
  }

  return data;
}
