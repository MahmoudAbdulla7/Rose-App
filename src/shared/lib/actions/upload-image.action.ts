'use server';

import { API_HEADERS } from '../apis/headers.options';
import { buildApiEndpoint } from '../utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '../utils/auth.utils';

export async function uploadImage(formData: FormData): Promise<string> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(buildApiEndpoint('/upload').toString(), {
    method: 'POST',
    headers: {
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
    body: formData,
  });

  const data = (await response.json()) as IAPIResponse<{ url: string }>;

  if (!data.status) {
    throw new Error(data.message || 'Failed to upload image');
  }

  return data.payload.url;
}
