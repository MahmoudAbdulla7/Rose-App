import { useMutation } from '@tanstack/react-query';
import { requestForgotPassword } from '@/features/auth/lib/apis/forgot-password.api';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AuthFooter from './auth-footer';
import { Separator } from '@/shared/ui/separator';
import { emailSchema } from '../lib/schemas/forgot-password.schema';
import type { Step } from '../lib/types/forgot-password';

type ForgotPasswordFormProps = {
  goToStep: React.Dispatch<React.SetStateAction<Step>>;
};

export default function ForgotPasswordForm({ goToStep }: ForgotPasswordFormProps) {
  // Translation
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');

  // State
  const [serverError, setServerError] = useState<string | null>(null);

  // Context
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext();

  // Mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: requestForgotPassword,
    onSuccess: () => {
      goToStep('SENT');
    },
    onError: (error) => {
      setServerError(error instanceof Error ? error.message : tCommon('error.networkError.text'));
    },
  });

  // Functions
  const submitEmail = handleSubmit((values) => {
    setServerError(null);

    const parsed = emailSchema.safeParse({ email: values.email });
    if (!parsed.success) {
      setError('email', { type: 'validate', message: 'invalidEmail' });
      return;
    }
    forgotPasswordMutation.mutate(values.email);
  });

  return (
    <>
      {/* Header */}
      <div className="flex items-center">
        <h1 className="text-ds-text-plain text-3xl font-bold">{t('forgotPw.email.title')}</h1>
      </div>

      <p>{t('forgotPw.email.description')}</p>

      <Separator className="mt-4 mb-6" />

      {/* Form */}
      <form onSubmit={submitEmail} className="space-y-5">
        <Input
          label={t('forgotPw.email.emailLabel')}
          placeholder={t('forgotPw.email.emailPlaceholder')}
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message ? tCommon('Input.invalidEmail') : undefined}
          {...register('email')}
        />

        {serverError && <div className="text-ds-danger text-sm">{serverError}</div>}

        <Button
          type="submit"
          className="mt-9 w-full"
          loading={isSubmitting || forgotPasswordMutation.isPending}
        >
          {t('forgotPw.email.continue')}
        </Button>
      </form>

      {/* Footer */}
      <AuthFooter
        text={t('forgotPw.email.footerText')}
        linkText={t('forgotPw.email.footerLink')}
        href="/register"
      />
    </>
  );
}
