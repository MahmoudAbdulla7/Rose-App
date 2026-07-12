'use client';

import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Step } from '../lib/constants/forgot-password.constant';
import { STEP } from '../lib/constants/forgot-password.constant';
import AuthFooter from './auth-footer';

type PasswordResetSentProps = {
  goToStep: React.Dispatch<React.SetStateAction<Step>>;
  email: string;
};

export default function PasswordResetSent({ goToStep, email }: PasswordResetSentProps) {
  const t = useTranslations('auth');

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
          <ChevronLeft className="rtl:rotate-180" />
        </Button>

        <h1 className="text-ds-text-plain text-2xl font-bold">{t('forgotPw.sent.title')}</h1>
      </div>

      <p className="text-ds-text-default mt-2 text-sm">{t('forgotPw.sent.description')}</p>

      <p className="text-ds-info mb-2 text-sm">{email || '-'}</p>

      <Separator className="mt-4 mb-6" />

      {/* Body */}
      <p className="text-ds-text-default mb-2 text-sm">{t('forgotPw.sent.instruction')}</p>
      <p className="text-ds-text-default text-sm">{t('forgotPw.sent.spamHint')}</p>

      {/* Footer */}
      <AuthFooter
        text={t('forgotPw.sent.footerText')}
        linkText={t('forgotPw.sent.footerLink')}
        href={null}
      />
    </>
  );
}
