'use server';

import { cookies } from 'next/headers';

import { API_HEADERS } from '@/shared/lib/apis/headers.api';
import { RESEND_COOKIE, RESEND_TIMEOUT } from '../constants/otp.constant';
import type { IRegisterFields } from '../types/register';

export async function sendEmailVerificationAction(email: IRegisterFields['email']) {
  // Validate email
  if (!email) {
    throw new Error('Email is required');
  }

  const cookieStore = await cookies();

  // Read the resend verification cookie value (if it exists) from the cookie store
  const resendCookie = cookieStore.get(RESEND_COOKIE)?.value;

  if (resendCookie) {
    try {
      const { email: savedEmail, expiresAt } = JSON.parse(resendCookie);

      const isSameEmail = savedEmail === email;
      const isResendActive = expiresAt > Date.now();

      if (isSameEmail && isResendActive) {
        return {
          status: true,
          code: 200,
          message: '',
          payload: null,
        } satisfies IAPIResponse<null>;
      }
    } catch {
      /**
       * Ignore invalid or malformed cookie
       * and continue sending a new verification email.
       */
    }
  }

  // Send request to the backend to send the email verification
  const response = await fetch(`${process.env.NEXT_BASE_URL}auth/send-email-verification`, {
    method: 'POST',
    headers: API_HEADERS.JSON,
    body: JSON.stringify({ email }),
  });

  const result: IAPIResponse<null> = await response.json();

  if (result.status) {
    // Calculate the expiration time for the resend verification cookie
    const expiresAt = Date.now() + RESEND_TIMEOUT * 1000;

    // Store the resend verification cookie value in the cookie store
    cookieStore.set(RESEND_COOKIE, JSON.stringify({ email, expiresAt }), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: RESEND_TIMEOUT,
    });
  }

  return result;
}
