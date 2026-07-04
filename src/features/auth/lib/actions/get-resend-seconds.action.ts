'use server';

import { cookies } from 'next/headers';

import { RESEND_COOKIE } from '../constants/otp.constant';
import type { IRegisterFields } from '../types/register';

export async function getResendSecondsAction(email: IRegisterFields['email']) {
  // Get cookie store
  const cookieStore = await cookies();

  // Read resend verification cookie value (if exists)
  const resendCookie = cookieStore.get(RESEND_COOKIE)?.value;

  if (!resendCookie) return 0;

  try {
    const { email: savedEmail, expiresAt } = JSON.parse(resendCookie);

    if (savedEmail !== email) return 0;

    return Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
  } catch {
    return 0;
  }
}
