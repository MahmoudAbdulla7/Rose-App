import 'server-only';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import type { AddressesPayload } from '@/features/layout/lib/types/address';

export async function getCurrentAddress() {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  const endpoint = buildApiEndpoint(`addresses`);

  const response = await fetch(endpoint, {
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
