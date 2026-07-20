'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

import type { GetNotificationsParams, NotificationPayload } from '../types/notification';

export async function getNotificationAction({
  page = 1,
  limit = 10,
}: GetNotificationsParams): Promise<NotificationPayload> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  const response = await fetch(
    `${process.env.NEXT_BASE_URL}notifications?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        ...API_HEADERS.JSON,
        ...API_HEADERS.AUTHORIZATION(token!),
      },
    },
  );

  const data: IAPIResponse<NotificationPayload> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}
