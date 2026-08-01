'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

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

export async function deleteNotificationAction(id: string) {
  const endpoint = buildApiEndpoint(`notifications/${id}`);

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

export async function deleteAllNotificationsAction() {
  const endpoint = buildApiEndpoint('notifications/clear-all');

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
