'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Separator } from '@/shared/ui/separator';
import { GENDER } from '../lib/constants/gender.constant';
import { REGISTER_STEP, type RegisterStep } from '../lib/constants/steps.constant';
import { createRegisterSchema } from '../lib/schemas/register.schema';
import type { IRegisterFields } from '../lib/types/register';
import { Step } from './step';
import { EmailField } from './steps/email-field';
import { OTP } from './steps/otp';
import { Password } from './steps/password';
import { UserInfo } from './steps/user-info';

export default function Register() {
  // Translations
  const t = useTranslations('register');
  const tv = useTranslations('register.validation');

  // State
  const [step, setStep] = useState<RegisterStep>(REGISTER_STEP.EMAIL);

  // Form
  const form = useForm<IRegisterFields>({
    resolver: zodResolver(createRegisterSchema(tv)),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      gender: GENDER.MALE,
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  //Variable
  const isEmailStep = step === REGISTER_STEP.EMAIL;

  return (
    <div className="space-y-9">
      {!isEmailStep && <Step currentStep={step} onStepClick={setStep} />}

      <FormProvider {...form}>
        {/* Email step */}
        {step === REGISTER_STEP.EMAIL && (
          <EmailField onVerified={() => setStep(REGISTER_STEP.OTP)} />
        )}

        {/* OTP step */}
        {step === REGISTER_STEP.OTP && (
          <OTP
            onEdit={() => setStep(REGISTER_STEP.EMAIL)}
            onVerified={() => setStep(REGISTER_STEP.DETAILS)}
          />
        )}

        {/* Details step */}
        {step === REGISTER_STEP.DETAILS && (
          <UserInfo onNext={() => setStep(REGISTER_STEP.PASSWORD)} />
        )}

        {/* Password step */}
        {step === REGISTER_STEP.PASSWORD && <Password />}
      </FormProvider>

      {/* Footer: login link on the email step, help link on the rest */}
      <div className="flex flex-col items-center gap-5">
        {/* Separator */}
        <Separator />

        {/* Footer text */}
        <p className="text-ds-inverse text-sm">
          {isEmailStep
            ? t.rich('footer.text', {
                login: (chunks) => (
                  <Link href="/login" className="text-ds-primary font-bold">
                    {chunks}
                  </Link>
                ),
              })
            : /* Help link */
              t.rich('footer.help', {
                contact: (chunks) => (
                  <Link href="/contact" className="text-ds-primary font-bold">
                    {chunks}
                  </Link>
                ),
              })}
        </p>
      </div>
    </div>
  );
}
