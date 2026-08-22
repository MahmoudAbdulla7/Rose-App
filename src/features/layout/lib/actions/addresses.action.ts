'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import type { Address, AddressPayload } from '../types/address';

async function getHeaders() {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  return {
    ...API_HEADERS.JSON,
    ...API_HEADERS.AUTHORIZATION(token),
  };
}

export async function createAddressAction(payload: AddressPayload) {
  const endpoint = buildApiEndpoint('addresses');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(payload),
  });

  const data: IAPIResponse<Address> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}

export async function updateAddressAction(id: string, payload: AddressPayload) {
  const endpoint = buildApiEndpoint(`addresses/${id}`);

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: await getHeaders(),
    body: JSON.stringify(payload),
  });

  const data: IAPIResponse<Address> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}

export async function deleteAddressAction(id: string) {
  const endpoint = buildApiEndpoint(`addresses/${id}`);

  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: await getHeaders(),
  });

  const data: IAPIResponse<null> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}
