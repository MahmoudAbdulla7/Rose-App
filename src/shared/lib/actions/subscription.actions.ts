'use server';

import type { SubscriptionResponse } from '../types/subscription';
import { API_HEADERS } from '../apis/headers.options';
import { buildApiEndpoint } from '../utils/api-endpoint-builder.utils';

export async function subscribe(email: string): Promise<SubscriptionResponse> {
  const response = await fetch(buildApiEndpoint('subscriptions'), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify({ email }),
  });

  return (await response.json()) as SubscriptionResponse;
}
