'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { getResendSecondsAction } from '../actions/get-resend-seconds.action';
import { sendEmailVerificationAction } from '../actions/send-email-verification.action';
import { RESEND_TIMEOUT } from '../constants/otp.constant';
import type { IRegisterFields } from '../types/register';

interface IUseResendTimerParams {
  email: IRegisterFields['email'];
}

export function useResendTimer({ email }: IUseResendTimerParams) {
  // Translation
  const t = useTranslations('auth.register');

  // State
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [isResending, setIsResending] = useState(false);

  // Effects
  useEffect(() => {
    let isMounted = true;

    getResendSecondsAction(email).then((remainingSeconds) => {
      if (isMounted) setSecondsLeft(remainingSeconds);
    });

    return () => {
      isMounted = false;
    };
  }, [email]);

  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((current) => (current && current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  // Functions
  const resend = async () => {
    setIsResending(true);
    try {
      const res = await sendEmailVerificationAction(email);

      if (!res.status) {
        toast.error(res.message || t('messages.error'));
        return;
      }

      setSecondsLeft(RESEND_TIMEOUT);
      toast.success(t('otp.resent'));
    } catch {
      toast.error(t('messages.error'));
    } finally {
      setIsResending(false);
    }
  };

  return { secondsLeft, isResending, resend };
}
