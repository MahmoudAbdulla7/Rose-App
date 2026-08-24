'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type { IChangeEmailFields } from '../types/change-email';

export async function requestEmailChangeAction(
  body: IChangeEmailFields,
): Promise<IAPIResponse<null>> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    return {
      status: false,
      code: 401,
      message: 'Authentication required',
    };
  }

  const endpoint = buildApiEndpoint('users/email/request');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
    body: JSON.stringify(body),
  });

  return (await response.json()) as IAPIResponse<null>;
}
