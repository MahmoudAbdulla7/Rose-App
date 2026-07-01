'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { Link } from '@/i18n/navigation';
import { requestForgotPassword } from '@/features/auth/api/forgot-password';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

const step1Schema = z.object({
  email: z.email(),
});

type Step1Values = z.infer<typeof step1Schema>;

export default function ForgotPasswordFlow() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const [serverError, setServerError] = useState<string | null>(null);

  const step1Form = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email: '' },
  });

  const submitStep1 = step1Form.handleSubmit(async ({ email }) => {
    setServerError(null);
    try {
      const response = await requestForgotPassword(email);
      const token = typeof response.payload === 'string' ? response.payload : null;
      if (!token) {
        setServerError(response.message || t('forgotPw.step1.noAccount'));
        return;
      }
    } catch (error) {
      setServerError(
        error instanceof Error && error.message
          ? error.message
          : tCommon('error.networkError.text'),
      );
    }
  });

  return (
    <div className="mx-auto flex w-3/4 flex-col gap-8 px-6 py-10">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-ds-text-plain text-3xl font-semibold tracking-tight">
            {t('forgotPw.step1.title')}
          </h1>
          <p className="text-ds-text-soft max-w-prose text-sm leading-6">
            {t('forgotPw.step1.subtitle')}
          </p>
        </div>
      </div>

      <form onSubmit={submitStep1} className="space-y-5">
        <Input
          label={t('forgotPw.step1.emailLabel')}
          placeholder={t('forgotPw.step1.emailPlaceholder')}
          type="email"
          autoComplete="email"
          inputMode="email"
          error={
            step1Form.formState.errors.email?.message ? tCommon('Input.invalidEmail') : undefined
          }
          {...step1Form.register('email')}
        />

        {serverError && <div className="text-ds-danger px-4 py-3 text-sm">{serverError}</div>}

        <Button type="submit" className="w-full" loading={step1Form.formState.isSubmitting}>
          {t('forgotPw.step1.continue')}
        </Button>
      </form>

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
