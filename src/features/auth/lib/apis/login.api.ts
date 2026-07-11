import { API_HEADERS } from '@/shared/lib/apis/headers.api';
import type { ILoginPayload } from '../types/login';
import type { ILoginResponse } from '../types/auth';

const NETWORK_ERROR_RESPONSE: IErrorResponse = {
  status: false,
  code: 0,
  message: 'NETWORK_ERROR',
};

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

  const loginUrl = new URL(
    'auth/login',
    baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`,
  ).toString();

  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        ...API_HEADERS.JSON,
      },
      cache: 'no-store',
    });

    try {
      const data: IAPIResponse<ILoginResponse> = await response.json();
      return data;
    } catch {
      return {
        status: false,
        code: response.status || 500,
        message: 'NETWORK_ERROR',
      };
    }
  } catch {
    return NETWORK_ERROR_RESPONSE;
  }
};
