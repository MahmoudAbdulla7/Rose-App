import 'server-only';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type {
  ICheckoutSessionResponse,
  IConfirmPaymentPayload,
  IConfirmPaymentResponse,
  ICreatePaymentIntentResponse,
} from '../types/payment';

/**
 * Create a payment intent
 * @param orderId - The order ID
 * @returns The payment intent response
 */
export async function createPaymentIntent(orderId: string): Promise<ICreatePaymentIntentResponse> {
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

/**
 * Confirm a payment
 * @param payload - The payment payload
 * @returns The payment response
 */
export async function confirmPayment(
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

/**
 * Get a checkout session
 * @param sessionId - The session ID
 * @returns The checkout session response
 */
export async function getCheckoutSession(sessionId: string): Promise<ICheckoutSessionResponse> {
  const token = await getNextAuthToken();
  if (!token?.accessToken) throw new Error('Unauthorized');

  const endpoint = buildApiEndpoint('/payments/checkout-session', { session_id: sessionId });
  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken as string),
    },
  });

  const data = (await response.json()) as ICheckoutSessionResponse;

  if (!response.ok || !data.status) {
    throw new Error(!data.status ? data.message : 'Failed to verify checkout session');
  }

  return data;
}
