'use client';

import { Button } from '@/shared/ui/button';
import { PasswordInput } from '@/shared/ui/password-input';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { requestResetPassword } from '../lib/apis/reset-password.api';
import { useSearchParams } from 'next/navigation';
import AuthFooter from './auth-footer';
import { Separator } from '@/shared/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRegisterSchema } from '../lib/schemas/register.schema';

const schemaInstance = createRegisterSchema((key: string) => key);

export const resetPasswordSchema = z
  .object({
    password: schemaInstance.shape.password,
    confirmPassword: schemaInstance.shape.confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const [serverError, setServerError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const methods = useForm<ResetPasswordInput>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const config = {
    title: t('forgotPw.reset.title'),
    description: t('forgotPw.reset.description'),
    newPasswordLabel: t('forgotPw.reset.newPasswordLabel'),
    confirmPasswordLabel: t('forgotPw.reset.confirmPasswordLabel'),
    newPasswordPlaceholder: t('forgotPw.reset.newPasswordPlaceholder'),
    confirmPasswordPlaceholder: t('forgotPw.reset.confirmPasswordPlaceholder'),
    reset: t('forgotPw.reset.reset'),
    success: t('forgotPw.reset.success'),
    differentFromCurrent: t('forgotPw.reset.differentFromCurrent'),
    footerText: t('forgotPw.reset.footerText'),
    footerLink: t('forgotPw.reset.footerLink'),
    href: '',
  };

  // Mutation
  const resetPasswordMutation = useMutation({
    mutationFn: requestResetPassword,
    onSuccess: () => {
      toast(config.success);
    },
    onError: (error) => {
      setServerError(error instanceof Error ? error.message : tCommon('error.networkError.text'));
    },
  });

  // Functions
  const submitPassword = handleSubmit((values) => {
    if (!token) {
      setServerError('Invalid or missing reset token.');
      return;
    }

    setServerError(null);

    resetPasswordMutation.mutate({
      token,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
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
      <FormProvider {...methods}>
        <form onSubmit={submitPassword} className="space-y-5">
          <PasswordInput
            label={config.newPasswordLabel}
            placeholder={config.newPasswordPlaceholder}
            error={errors.password?.message}
            {...register('password')}
          />

          <PasswordInput
            label={config.confirmPasswordLabel}
            placeholder={config.confirmPasswordPlaceholder}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          {serverError && (
            <div className="border-ds-danger/20 bg-ds-danger-fade text-ds-danger rounded-lg border px-4 py-3 text-sm">
              {serverError}
            </div>
          )}

          <Button type="submit" className="mt-9 w-full" loading={isSubmitting}>
            {config.reset}
          </Button>
        </form>
      </FormProvider>

      {/* Footer */}
      <AuthFooter text={config.footerText} linkText={config.footerLink} href={config.href} />
    </>
  );
}
