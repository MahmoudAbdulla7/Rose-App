import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import type { ILoginPayload } from '../types/login';
import type { ILoginResponse } from '../types/auth';

const NETWORK_ERROR_RESPONSE: IErrorResponse = {
  status: false,
  code: 0,
  message: 'NETWORK_ERROR',
};

export const login = async (payload: ILoginPayload): Promise<IAPIResponse<ILoginResponse>> => {
  if (!process.env.NEXT_BASE_URL) {
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

  const loginUrl = buildApiEndpoint('auth/login').toString();

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
