'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import type { Review, ReviewInput, ReviewPayload } from '../types/review';

export async function createReviewAction(input: ReviewInput): Promise<Review> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  const endpoint = buildApiEndpoint('/reviews');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
    body: JSON.stringify(input),
  });

  const data: IAPIResponse<ReviewPayload> = await response.json();

  if (!data.status) {
    console.error(data);
    throw new Error(data.message || 'Request failed');
  }

  return data.payload.review;
}
