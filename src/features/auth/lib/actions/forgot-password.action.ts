'use server';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';

type ForgotPasswordBody = {
  email: string;
};

type ResetPasswordBody = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export async function forgotPasswordAction(body: ForgotPasswordBody): Promise<IAPIResponse<null>> {
  const response = await fetch(`${process.env.NEXT_BASE_URL}auth/forgot-password`, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as IAPIResponse<null>;

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function resetPasswordAction(body: ResetPasswordBody): Promise<IAPIResponse<null>> {
  const response = await fetch(`${process.env.NEXT_BASE_URL}auth/reset-password`, {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as IAPIResponse<null>;

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
