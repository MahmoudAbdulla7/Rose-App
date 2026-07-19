'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import type { IRegisterFields } from '../types/register';
import type { IUser } from '../types/auth';

export async function registerAction(payload: IRegisterFields) {
  const response = await fetch(buildApiEndpoint('auth/register'), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify(payload),
  });

  const data: IAPIResponse<IUser> = await response.json();

  return data;
}
