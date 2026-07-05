import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { requestForgotPassword } from '@/features/auth/lib/apis/forgot-password.api';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Step } from './forgot-password-flow';
import AuthFooter from './auth-footer';
import { Separator } from '@/shared/ui/separator';

const emailSchema = z.object({
  email: z.email(),
});

type ForgotPasswordFormProps = {
  goToStep: React.Dispatch<React.SetStateAction<Step>>;
};

export default function ForgotPasswordForm({ goToStep }: ForgotPasswordFormProps) {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const config = {
    title: t('forgotPw.email.title'),
    description: t('forgotPw.email.description'),
    emailLabel: t('forgotPw.email.emailLabel'),
    emailPlaceholder: t('forgotPw.email.emailPlaceholder'),
    continue: t('forgotPw.email.continue'),
    noAccount: t('forgotPw.email.noAccount'),
    footerText: t('forgotPw.email.footerText'),
    footerLink: t('forgotPw.email.footerLink'),
    href: '/register',
  };

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
        <h1 className="text-ds-text-plain text-3xl font-bold">{config.title}</h1>
      </div>

      <p>{config.description}</p>

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
      <AuthFooter text={config.footerText} linkText={config.footerLink} href={config.href} />
    </>
  );
}
