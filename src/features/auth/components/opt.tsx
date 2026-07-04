'use client';

import { useState, type SyntheticEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { confirmEmailAction } from '../lib/actions/confirm-email.action';
import { verifyEmailAction } from '../lib/actions/verify-email.action';
import { OTP_LENGTH } from '../lib/constants/otp.constant';
import type { IRegisterFields } from '../lib/types/register';
import { RegisterHeader } from './register-header';

interface IOTPProps {
  onEdit: () => void;
  onVerified: () => void;
}

export default function OTP({ onEdit, onVerified }: IOTPProps) {
  // Translation
  const t = useTranslations('register');

  // States
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Form
  const { getValues } = useFormContext<IRegisterFields>();
  const email = getValues('email');

  // Functions
  const handleVerify = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code.length !== OTP_LENGTH) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const res = await confirmEmailAction(email, code);

      if (!res.status) {
        setError(res.message || t('otp.invalid'));
        return;
      }

      onVerified();
    } catch {
      toast.error(t('messages.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const res = await verifyEmailAction(email);

      if (!res.status) {
        toast.error(res.message || t('messages.error'));
        return;
      }

      setCode('');
      setError(null);
      toast.success(t('otp.resent'));
    } catch {
      toast.error(t('messages.error'));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-9">
      {/* Header: page title + step header */}
      <RegisterHeader
        title={t('otp.title')}
        description={t.rich('otp.description', {
          email,
          edit: (chunks) => (
            <button type="button" onClick={onEdit} className="font-medium text-blue-700 underline">
              {chunks}
            </button>
          ),
        })}
      />

      {/* OTP fields + resend */}
      <div className="flex flex-col items-end gap-4">
        <InputOTP
          maxLength={OTP_LENGTH}
          value={code}
          onChange={setCode}
          containerClassName="w-full justify-center"
        >
          <InputOTPGroup className="">
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <InputOTPSlot key={index} index={index} aria-invalid={!!error} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {error && <FieldError className="w-full text-center">{error}</FieldError>}

        <Button
          type="button"
          variant="ghost"
          onClick={handleResend}
          loading={isResending}
          size="lg"
          className="h-11"
        >
          {t('otp.resend')}
        </Button>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        disabled={code.length !== OTP_LENGTH}
        className="bg-maroon-600 hover:bg-maroon-700 h-10.25 w-full"
      >
        {t('otp.verify')}
      </Button>
    </form>
  );
}
