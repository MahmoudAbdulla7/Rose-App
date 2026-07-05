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
  const t = useTranslations('register');

  // state
  const { secondsLeft, isResending, resend } = useResendTimer({ email });

  // Not initialized yet: render nothing until the cooldown is known.
  if (secondsLeft === null) return null;

  // Cooldown still running: show the remaining time.
  if (secondsLeft > 0) {
    return (
      <p className="text-muted-foreground h-11 text-sm">
        {t('otp.resend-in', { seconds: secondsLeft })}
      </p>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="lg"
      className="h-11"
      loading={isResending}
      onClick={resend}
    >
      {t('otp.resend')}
    </Button>
  );
}
