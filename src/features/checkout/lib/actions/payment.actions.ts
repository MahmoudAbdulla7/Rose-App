'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type {
  IConfirmPaymentPayload,
  IConfirmPaymentResponse,
  ICreatePaymentIntentResponse,
} from '../types/payment';

export async function createPaymentIntentAction(
  orderId: string,
): Promise<ICreatePaymentIntentResponse> {
  const token = await getNextAuthToken();
  if (!token?.accessToken) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint('/payments/create-intent', {});
  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken as string),
    },
    body: JSON.stringify({ orderId }),
  });

  const data = (await response.json()) as ICreatePaymentIntentResponse;

  if (!response.ok || !data.status) {
    throw new Error(!data.status ? data.message : 'Failed to create payment intent');
  }

  return data;
}

export async function confirmPaymentAction(
  payload: IConfirmPaymentPayload,
): Promise<IConfirmPaymentResponse> {
  const token = await getNextAuthToken();
  if (!token?.accessToken) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint('/payments/confirm', {});
  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken as string),
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as IConfirmPaymentResponse;

  if (!response.ok || !data.status) {
    throw new Error(!data.status ? data.message : 'Failed to confirm payment');
  }

  return data;
}
