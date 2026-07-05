import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { requestForgotPassword } from '@/features/auth/lib/apis/forgot-password.api';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Step } from './forgot-password-flow';

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
  );
}
