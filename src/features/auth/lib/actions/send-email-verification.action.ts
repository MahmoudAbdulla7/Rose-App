'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.api';
import type { IRegisterFields } from '../types/register';

export async function verifyEmailAction(email: IRegisterFields['email']) {
  if (!email) {
    throw new Error('Email is required');
  }

  const response = await fetch(`${process.env.NEXT_BASE_URL}auth/send-email-verification`, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify({ email }),
  });

  const data: IAPIResponse<null> = await response.json();

  return data;
}
