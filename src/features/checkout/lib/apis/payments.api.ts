import 'server-only';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type { ICheckoutSessionResponse } from '../types/payment';

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
