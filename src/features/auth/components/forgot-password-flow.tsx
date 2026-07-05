'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import PasswordResetSent from './password-reset-sent';
import ForgotPasswordForm from './forgot-password-form';
import ResetPassword from './reset-password';

type FormData = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export type Step = (typeof STEP)[keyof typeof STEP];

export const STEP = {
  EMAIL: 'EMAIL',
  SENT: 'SENT',
  RESET: 'RESET',
} as const;

export default function ForgotPasswordFlow() {
  const t = useTranslations('auth');
  const [step, setStep] = useState<Step>(STEP.EMAIL);

  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const stepConfig = {
    [STEP.EMAIL]: {
      title: t('forgotPw.email.title'),
      description: t('forgotPw.email.description'),
      footerText: t('forgotPw.email.footerText'),
      footerLink: t('forgotPw.email.footerLink'),
      href: '/register',
    },
    [STEP.SENT]: {
      title: t('forgotPw.sent.title'),
      description: t('forgotPw.sent.description'),
      instruction: t('forgotPw.sent.instruction'),
      spamHint: t('forgotPw.sent.spamHint'),
      footerText: t('forgotPw.sent.footerText'),
      footerLink: t('forgotPw.sent.footerLink'),
      href: '',
    },
    [STEP.RESET]: {
      title: t('forgotPw.reset.title'),
      description: t('forgotPw.reset.description'),
      footerText: t('forgotPw.reset.footerText'),
      footerLink: t('forgotPw.reset.footerLink'),
      href: '',
    },
  };

  return (
    <FormProvider {...methods}>
      {step === STEP.EMAIL && <ForgotPasswordForm goToStep={setStep} />}
      {step === STEP.SENT && (
        <PasswordResetSent
          goToStep={setStep}
          instruction={stepConfig[STEP.SENT].instruction}
          spamHint={stepConfig[STEP.SENT].spamHint}
        />
      )}
      {step === STEP.RESET && <ResetPassword />}
    </FormProvider>
  );
}
