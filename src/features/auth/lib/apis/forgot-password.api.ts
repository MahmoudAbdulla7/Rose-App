import type { ForgotPasswordResponse, ForgotPasswordRequestBody } from '../types/forgot-password';

export async function requestForgotPassword(email: string): Promise<ForgotPasswordResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email } satisfies ForgotPasswordRequestBody),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
