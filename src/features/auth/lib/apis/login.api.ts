import { API_HEADERS } from '@/shared/lib/apis/headers.api';
import type { ILoginPayload } from '../types/login';
import type { ILoginResponse } from '../types/auth';

export const login = async (payload: ILoginPayload): Promise<IAPIResponse<ILoginResponse>> => {
  const baseUrl = process.env.NEXT_BASE_URL;

  if (!baseUrl) {
    return {
      status: false,
      code: 500,
      message: 'NEXT_BASE_URL is not configured',
    };
  }

  if (!payload.username || !payload.password) {
    return {
      status: false,
      code: 400,
      message: 'Username and password are required',
    };
  }

  const response = await fetch(`${baseUrl}auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      ...API_HEADERS.JSON,
    },
    cache: 'no-store',
  });

  const data: IAPIResponse<ILoginResponse> = await response.json();

  return data;
};
