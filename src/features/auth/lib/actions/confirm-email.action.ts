'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import type { IRegisterFields } from '../types/register';

export async function confirmEmailAction(email: IRegisterFields['email'], code: string) {
  if (!email) {
    throw new Error('Email is required');
  }

  if (!code) {
    throw new Error('Code is required');
  }

  const response = await fetch(buildApiEndpoint('auth/confirm-email-verification'), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify({ email, code }),
  });

  const data: IAPIResponse<null> = await response.json();

  return data;
}
