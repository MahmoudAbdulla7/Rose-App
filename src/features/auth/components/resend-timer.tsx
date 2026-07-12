'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { useResendTimer } from '../lib/hooks/use-resend-timer.hook';
import type { IRegisterFields } from '../lib/types/register';

interface IResendTimerProps {
  email: IRegisterFields['email'];
}

export function ResendTimer({ email }: IResendTimerProps) {
  // Translation
  const t = useTranslations('auth.register');

  // state
  const { secondsLeft, isResending, resend } = useResendTimer({ email });

  if (secondsLeft === null) return null;

  if (secondsLeft > 0) {
    return (
      <p className="text-muted-foreground flex min-h-7 items-center text-sm">
        {t('otp.resendIn', { seconds: secondsLeft })}
      </p>
    );
  }

  return (
    <Button type="button" variant="ghost" size="sm" loading={isResending} onClick={resend}>
      {t('otp.resend')}
    </Button>
  );
}
