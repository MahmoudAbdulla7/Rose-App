import 'server-only';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';
import type { GetNotificationsParams, NotificationPayload } from '../types/notification';

export async function getNotifications({
  page = 1,
  limit = 10,
}: GetNotificationsParams): Promise<NotificationPayload> {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  const endpoint = buildApiEndpoint('notifications', {
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token),
    },
  });

  const data: IAPIResponse<NotificationPayload> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Request failed');
  }

  return data.payload;
}
