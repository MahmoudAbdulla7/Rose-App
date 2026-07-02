'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { Link } from '@/i18n/navigation';
import { requestForgotPassword } from '@/features/auth/api/forgot-password';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import ForgotPasswordStep2 from './step2-otp-temp';

const step1Schema = z.object({
  email: z.email(),
});

type FormValues = {
  email: string;
};

type Step = 'step1' | 'step2';

export default function ForgotPasswordFlow() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const [step, setStep] = useState<Step>('step1');
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: requestForgotPassword,
    onSuccess: () => {
      setStep('step2');
    },
    onError: (error) => {
      setServerError(error instanceof Error ? error.message : tCommon('error.networkError.text'));
    },
  });

  const submitStep1 = form.handleSubmit((values) => {
    setServerError(null);

    const parsed = step1Schema.safeParse({ email: values.email });
    if (!parsed.success) {
      form.setError('email', { type: 'validate', message: 'invalidEmail' });
      return;
    }

    forgotPasswordMutation.mutate(values.email);
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
        <form onSubmit={submitStep1} className="space-y-5">
          <Input
            label={t('forgotPw.step1.emailLabel')}
            placeholder={t('forgotPw.step1.emailPlaceholder')}
            type="email"
            autoComplete="email"
            inputMode="email"
            error={form.formState.errors.email?.message ? tCommon('Input.invalidEmail') : undefined}
            {...form.register('email')}
          />

          {serverError && <div className="text-ds-danger px-4 py-3 text-sm">{serverError}</div>}

          <Button
            type="submit"
            className="w-full"
            loading={form.formState.isSubmitting || forgotPasswordMutation.isPending}
          >
            {t('forgotPw.step1.continue')}
          </Button>
        </form>
      ) : (
        <ForgotPasswordStep2
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
