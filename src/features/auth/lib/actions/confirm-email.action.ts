'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.api';
import type { IRegisterFields } from '../types/register';

export async function confirmEmailAction(email: IRegisterFields['email'], code: string) {
  if (!email) {
    throw new Error('Email is required');
  }

  if (!code) {
    throw new Error('Code is required');
  }

  const response = await fetch(`${process.env.NEXT_BASE_URL}auth/confirm-email-verification`, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify({ email, code }),
  });

  const data: IAPIResponse<null> = await response.json();

  return data;
}
