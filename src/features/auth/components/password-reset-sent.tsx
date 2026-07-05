'use client';

import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { Step } from './forgot-password-flow';
import { STEP } from './forgot-password-flow';
import { useTranslations } from 'next-intl';

type PasswordResetSentProps = {
  goToStep: React.Dispatch<React.SetStateAction<Step>>;
  instruction: string;
  spamHint: string;
};

export default function PasswordResetSent({
  goToStep,
  instruction,
  spamHint,
}: PasswordResetSentProps) {
  const t = useTranslations('auth');
  const { getValues } = useFormContext();
  const email = getValues('email');

  const config = {
    title: t('forgotPw.sent.title'),
    description: t('forgotPw.sent.description'),
    instruction: t('forgotPw.sent.instruction'),
    spamHint: t('forgotPw.sent.spamHint'),
    footerText: t('forgotPw.sent.footerText'),
    footerLink: t('forgotPw.sent.footerLink'),
    href: '',
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center">
        <Button
          type="button"
          variant="primary"
          size="icon"
          onClick={() => goToStep(STEP.EMAIL)}
          className="me-2.5"
        >
          <ChevronLeft />
        </Button>

        <h1 className="text-ds-text-plain text-3xl font-bold">{config.title}</h1>
      </div>

      <p>{config.description}</p>

      {/* Body */}
      <p className="text-ds-info">{email || '-'}</p>
      <Separator className="mt-4 mb-6" />
      <p className="text-ds-text-plain mb-4">{instruction}</p>
      <p className="text-ds-text-default">{spamHint}</p>
    </>
  );
}
