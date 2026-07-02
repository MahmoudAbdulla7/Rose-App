'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import OtpVerification from './otp-verification';
import ForgotPasswordForm from './forgot-password-form';
import type { FormValues } from '@/features/auth/lib/types/forgot-password';

type Step = 'step1' | 'step2';

export default function ForgotPasswordFlow() {
  const t = useTranslations('auth');
  const [step, setStep] = useState<Step>('step1');

  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  });

  return (
    <div className="mx-auto flex w-3/4 flex-col gap-8 px-6 py-10">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-ds-text-plain text-3xl font-semibold tracking-tight">
            {step === 'step1' ? t('forgotPw.step1.title') : t('forgotPw.step2.title')}
          </h1>
          <p className="text-ds-text-soft max-w-prose text-sm leading-6">
            {step === 'step1' ? t('forgotPw.step1.subtitle') : t('forgotPw.step2.subtitle')}
          </p>
        </div>
      </div>

      {step === 'step1' ? (
        <ForgotPasswordForm form={form} onSuccess={() => setStep('step2')} />
      ) : (
        <OtpVerification
          email={form.getValues('email')}
          onBack={() => setStep('step1')}
          onContinue={() => setStep('step2')}
        />
      )}

      <div className="text-ds-text-soft flex flex-col gap-3 p-5 text-sm">
        <Link
          href="/register"
          className="text-ds-primary hover:text-ds-primary-saturated font-medium transition-colors"
        >
          {t('forgotPw.step1.registerFooter')}
        </Link>
      </div>
    </div>
  );
}
