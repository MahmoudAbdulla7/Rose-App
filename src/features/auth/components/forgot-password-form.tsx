import { useMutation } from '@tanstack/react-query';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthFooter from './auth-footer';
import { forgotPasswordAction } from '../lib/actions/forgot-password.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { createForgotPasswordSchema } from '../lib/schemas/forgot-password.schema';
import type z from 'zod';
import type { Step } from '../lib/constants/forgot-password.constant';
import { STEP } from '../lib/constants/forgot-password.constant';
import AuthHeader from './auth-header';

type ForgotPasswordFormProps = {
  goToStep: React.Dispatch<React.SetStateAction<Step>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export default function ForgotPasswordForm({ goToStep, setEmail }: ForgotPasswordFormProps) {
  // Translation
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('register.validation');

  // Schema
  const forgotPasswordSchema = createForgotPasswordSchema(tValidation);

  type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

  // State
  const [serverError, setServerError] = useState<string | null>(null);

  // Mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPasswordAction,
    onSuccess: (_, variables) => {
      setEmail(variables.email);
      goToStep(STEP.SENT);
    },
    onError: (error) => {
      setServerError(error instanceof Error ? error.message : tCommon('error.networkError.text'));
    },
  });

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Functions
  const submitEmail = handleSubmit((values) => {
    setServerError(null);
    forgotPasswordMutation.mutate(values);
  });

  return (
    <>
      {/* Header */}
      <AuthHeader title={t('forgotPw.email.title')} description={t('forgotPw.email.description')} />

      {/* Form */}
      <form onSubmit={submitEmail} className="flex flex-col gap-5">
        <Input
          label={t('forgotPw.email.emailLabel')}
          placeholder={t('forgotPw.email.emailPlaceholder')}
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          {...register('email')}
        />

        {serverError && <div className="text-ds-danger text-sm">{serverError}</div>}

        <Button
          type="submit"
          className="w-full"
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
