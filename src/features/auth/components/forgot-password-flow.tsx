'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import OtpVerification from './otp-verification';
import ForgotPasswordForm from './forgot-password-form';

type FormData = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ForgotPasswordFlow() {
  const t = useTranslations('auth');
  const [step, setStep] = useState(0);
  const methods = useForm<FormData>({
    defaultValues: { email: '', otp: '', newPassword: '', confirmPassword: '' },
  });

  return (
    <>
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-ds-text-plain text-3xl font-semibold tracking-tight">
            {step === 0 ? t('forgotPw.step1.title') : t('forgotPw.step2.title')}
          </h1>
          <p className="text-ds-text-soft max-w-prose text-sm leading-6">
            {step === 0 ? t('forgotPw.step1.subtitle') : t('forgotPw.step2.subtitle')}
          </p>
        </div>
      </div>

      {/* Body */}
      <FormProvider {...methods}>
        {step === 0 && <ForgotPasswordForm goToStep={setStep} />}
        {step === 1 && <OtpVerification goToStep={setStep} />}
      </FormProvider>

      {/* Footer */}
      <div className="text-ds-text-soft flex flex-col gap-3 p-5 text-sm">
        <Link
          href="/register"
          className="text-ds-primary hover:text-ds-primary-saturated font-medium transition-colors"
        >
          {t('forgotPw.step1.registerFooter')}
        </Link>
      </div>
    </>
  );
}
