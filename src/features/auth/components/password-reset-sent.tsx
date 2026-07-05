'use client';

import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { Step } from '../lib/types/forgot-password';
import { STEP } from '../lib/constants/forgot-pw.constants';

type PasswordResetSentProps = {
  goToStep: React.Dispatch<React.SetStateAction<Step>>;
};

export default function PasswordResetSent({ goToStep }: PasswordResetSentProps) {
  // Translation
  const t = useTranslations('auth');

  // Context
  const { getValues } = useFormContext();

  // Variables
  const email = getValues('email');

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

        <h1 className="text-ds-text-plain text-3xl font-bold">{t('forgotPw.sent.title')}</h1>
      </div>

      <p>{t('forgotPw.sent.description')}</p>

      {/* Body */}
      <p className="text-ds-info">{email || '-'}</p>
      <Separator className="mt-4 mb-6" />
      <p className="text-ds-text-plain mb-4">{t('forgotPw.sent.instruction')}</p>
      <p className="text-ds-text-default">{t('forgotPw.sent.spamHint')}</p>
    </>
  );
}
