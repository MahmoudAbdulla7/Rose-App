'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';

type Step2OtpTempProps = {
  email: string;
  onBack: () => void;
  onContinue: () => void;
};

export default function ForgotPasswordStep2({ email, onBack, onContinue }: Step2OtpTempProps) {
  const t = useTranslations('auth');

  return (
    <div className="border-ds-border-soft bg-ds-plain/80 rounded-2xl border p-6 shadow-sm backdrop-blur">
      <div className="border-ds-border-soft bg-ds-muted/50 text-ds-text-soft mt-5 rounded-xl border px-4 py-3 text-sm">
        {t('forgotPw.step2.emailLabel')}: <span className="text-ds-text-plain">{email || '-'}</span>
      </div>

      <div className="mt-5 flex gap-3">
        <Button type="button" variant="subtle" className="flex-1" onClick={onBack}>
          {t('forgotPw.step2.back')}
        </Button>
        <Button type="button" className="flex-1" onClick={onContinue}>
          {t('forgotPw.step2.continue')}
        </Button>
      </div>
    </div>
  );
}
