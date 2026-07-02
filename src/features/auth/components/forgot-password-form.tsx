import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { requestForgotPassword } from '@/features/auth/lib/apis/forgot-password';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { FormValues } from '@/features/auth/lib/types/forgot-password';

const step1Schema = z.object({
  email: z.email(),
});

type ForgotPasswordFormProps = {
  form: UseFormReturn<FormValues>;
  onSuccess: () => void;
};

export default function ForgotPasswordForm({ form, onSuccess }: ForgotPasswordFormProps) {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const [serverError, setServerError] = useState<string | null>(null);

  const forgotPasswordMutation = useMutation({
    mutationFn: requestForgotPassword,
    onSuccess,
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
  );
}
