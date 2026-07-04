'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import Step from './step';

import { Link } from '@/i18n/navigation';
import { Separator } from '@/shared/ui/separator';
import { GENDER } from '../lib/constants/gender.constant';
import { createRegisterSchema } from '../lib/schemas/register.schema';
import type { IRegisterFields } from '../lib/types/register';
import { EmailField } from './email-field';
import OTP from './opt';
import { Password } from './password';
import { UserInfo } from './user-info';

export default function Register() {
  //Translations
  const t = useTranslations('register');
  const tv = useTranslations('register.validation');

  //state
  const [step, setStep] = useState(1);

  //Form
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

  return (
    <div className="space-y-9">
      {step !== 1 && <Step currentStep={step} />}

      <FormProvider {...form}>
        {/*Email Step*/}
        {step === 1 && <EmailField onVerified={() => setStep(2)} />}

        {/*OTP Step*/}
        {step === 2 && <OTP onEdit={() => setStep(1)} onVerified={() => setStep(3)} />}

        {/*Details Step*/}
        {step === 3 && <UserInfo onNext={() => setStep(4)} />}

        {/*Password Step*/}
        {step === 4 && <Password />}
      </FormProvider>

      {/* Footer: login link on the email step, help link on the rest */}
      <div className="flex flex-col items-center gap-5">
        {/* Separator */}
        <Separator />

        {/* Footer Text */}
        <p className="text-ds-inverse text-sm">
          {step === 1
            ? t.rich('footer.text', {
                login: (chunks) => (
                  <Link href="/login" className="text-ds-primary font-bold">
                    {chunks}
                  </Link>
                ),
              })
            : /* Help Link */
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
