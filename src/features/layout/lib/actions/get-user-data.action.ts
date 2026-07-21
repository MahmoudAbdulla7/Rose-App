'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type { UserPayload } from '../types/user';

export async function getUserDataAction() {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${process.env.NEXT_BASE_URL}users/profile`, {
    method: 'GET',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
  });

  const data: IAPIResponse<UserPayload> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload.user;
}
