'use client';

import { Button } from '@/shared/ui/button';
import { PasswordInput } from '@/shared/ui/password-input';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import AuthFooter from './auth-footer';
import { zodResolver } from '@hookform/resolvers/zod';
import { createResetPasswordSchema } from '../lib/schemas/forgot-password.schema';
import { useRouter } from '@/i18n/navigation';
import { resetPasswordAction } from '../lib/actions/forgot-password.action';
import type z from 'zod';
import AuthHeader from './auth-header';

export default function ResetPassword() {
  // Translation
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('register.validation');

  // Schema
  const resetPasswordSchema = createResetPasswordSchema(tValidation);

  type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

  // Navigation
  const router = useRouter();

  // State
  const [serverError, setServerError] = useState<string | null>(null);

  // Mutation
  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordAction,
    onSuccess: () => {
      toast.success(t('forgotPw.reset.success'));
      router.push('/login');
    },
    onError: (error) => {
      setServerError(error instanceof Error ? error.message : tCommon('error.networkError.text'));
    },
  });

  // Hook
  const searchParams = useSearchParams();

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Variables
  const token = searchParams.get('token') || '';

  // Functions
  const submitPassword = handleSubmit((values) => {
    if (!token) {
      setServerError('Invalid or missing reset token.');
      return;
    }
    setServerError(null);

    resetPasswordMutation.mutate({
      token,
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    });
  });

  return (
    <>
      {/* Header */}
      <AuthHeader title={t('forgotPw.reset.title')} description={t('forgotPw.reset.description')} />

      {/* Form */}
      <form onSubmit={submitPassword} className="space-y-5">
        <PasswordInput
          label={t('forgotPw.reset.newPasswordLabel')}
          placeholder={t('forgotPw.reset.newPasswordPlaceholder')}
          error={errors.password?.message}
          {...register('password')}
        />

        <PasswordInput
          label={t('forgotPw.reset.confirmPasswordLabel')}
          placeholder={t('forgotPw.reset.confirmPasswordPlaceholder')}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        {serverError && <div className="text-ds-danger text-sm">{serverError}</div>}

        <Button
          type="submit"
          className="mt-9 w-full"
          loading={isSubmitting || resetPasswordMutation.isPending}
        >
          {t('forgotPw.reset.reset')}
        </Button>
      </form>

      {/* Footer */}
      <AuthFooter
        text={t('forgotPw.reset.footerText')}
        linkText={t('forgotPw.reset.footerLink')}
        href={null}
      />
    </>
  );
}
