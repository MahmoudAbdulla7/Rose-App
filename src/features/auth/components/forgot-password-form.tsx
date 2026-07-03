import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { requestForgotPassword } from '@/features/auth/lib/apis/forgot-password';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const emailSchema = z.object({
  email: z.email(),
});

export default function ForgotPasswordForm({ goToStep }: { goToStep: (index: number) => void }) {
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
      goToStep(1);
    },
    onError: (error) => {
      setServerError(error instanceof Error ? error.message : tCommon('error.networkError.text'));
    },
  });

  // Functions
  const submitStep1 = handleSubmit((values) => {
    setServerError(null);

    const parsed = emailSchema.safeParse({ email: values.email });
    if (!parsed.success) {
      setError('email', { type: 'validate', message: 'invalidEmail' });
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
        error={errors.email?.message ? tCommon('Input.invalidEmail') : undefined}
        {...register('email')}
      />

      {serverError && <div className="text-ds-danger px-4 py-3 text-sm">{serverError}</div>}

      <Button
        type="submit"
        className="w-full"
        loading={isSubmitting || forgotPasswordMutation.isPending}
      >
        {t('forgotPw.step1.continue')}
      </Button>
    </form>
  );
}
