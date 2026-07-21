'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

async function getHeaders() {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  return {
    ...API_HEADERS.JSON,
    ...API_HEADERS.AUTHORIZATION(token!),
  };
}

export async function markNotificationReadAction(id: string) {
  const response = await fetch(`${process.env.NEXT_BASE_URL}notifications/${id}`, {
    method: 'PATCH',
    headers: await getHeaders(),
    body: JSON.stringify({
      isRead: true,
    }),
  });

  const data: IAPIResponse<null> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}

export async function markAllNotificationsReadAction() {
  const response = await fetch(`${process.env.NEXT_BASE_URL}notifications/mark-all-read`, {
    method: 'PATCH',
    headers: await getHeaders(),
  });

  const data: IAPIResponse<null> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}
