'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.api';
import type { ILoginPayload } from '../types/login';
import type { ILoginResponse } from '../types/auth';

export const login = async (payload: ILoginPayload): Promise<IAPIResponse<ILoginResponse>> => {
  if (!payload.username || !payload.password) {
    throw new Error('Username and password are required');
  }

  const response = await fetch(`${process.env.NEXT_BASE_URL}auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      ...API_HEADERS.JSON,
    },
  });

  const data: IAPIResponse<ILoginResponse> = await response.json();

  return data;
};
