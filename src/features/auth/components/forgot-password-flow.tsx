'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PasswordResetSent from './password-reset-sent';
import ForgotPasswordForm from './forgot-password-form';
import ResetPassword from './reset-password';
import type { FormData, Step } from '../lib/types/forgot-password';
import { STEP } from '../lib/constants/forgot-pw.constants';

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<Step>(STEP.EMAIL);

  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <FormProvider {...methods}>
      {step === STEP.EMAIL && <ForgotPasswordForm goToStep={setStep} />}
      {step === STEP.SENT && <PasswordResetSent goToStep={setStep} />}
      {step === STEP.RESET && <ResetPassword />}
    </FormProvider>
  );
}
