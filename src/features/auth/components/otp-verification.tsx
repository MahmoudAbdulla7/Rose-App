'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

export default function OtpVerification({}: { goToStep: (index: number) => void }) {
  const t = useTranslations('auth');
  const { getValues } = useFormContext();
  const email = getValues('email');

  return (
    <div className="border-ds-border-soft bg-ds-plain/80 rounded-2xl border p-6 shadow-sm backdrop-blur">
      <div className="border-ds-border-soft bg-ds-muted/50 text-ds-text-soft mt-5 rounded-xl border px-4 py-3 text-sm">
        {t('forgotPw.step2.emailLabel')}: <span className="text-ds-text-plain">{email || '-'}</span>
      </div>
    </div>
  );
}
