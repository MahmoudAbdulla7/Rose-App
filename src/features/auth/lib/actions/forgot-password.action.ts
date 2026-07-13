'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.api';

type ForgotPasswordBody = {
  email: string;
  redirectUrl: string;
};

type ResetPasswordBody = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export async function forgotPasswordAction(input: ForgotPasswordBody): Promise<IAPIResponse<null>> {
  const response = await fetch(`${process.env.NEXT_BASE_URL}auth/forgot-password`, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify(input),
  });

  const data = (await response.json()) as IAPIResponse<null>;

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function resetPasswordAction(input: ResetPasswordBody): Promise<IAPIResponse<null>> {
  const response = await fetch(`${process.env.NEXT_BASE_URL}auth/reset-password`, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify(input),
  });

  const data = (await response.json()) as IAPIResponse<null>;

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
