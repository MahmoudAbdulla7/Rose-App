'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type { AddressesPayload } from '../types/address';

export async function getCurrentAddressAction() {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${process.env.NEXT_BASE_URL}addresses`, {
    method: 'GET',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
  });

  const data: IAPIResponse<AddressesPayload> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload.addresses;
}
