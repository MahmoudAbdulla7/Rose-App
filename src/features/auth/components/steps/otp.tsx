'use client';

import { useState, type SyntheticEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { confirmEmailAction } from '../../lib/actions/confirm-email.action';
import { OTP_LENGTH } from '../../lib/constants/otp.constant';
import type { IRegisterFields } from '../../lib/types/register';
import { RegisterHeader } from '../register-header';
import { ResendTimer } from '../resend-timer';

interface IOTPProps {
  onEdit: () => void;
  onVerified: () => void;
}

export function OTP({ onEdit, onVerified }: IOTPProps) {
  // Translation
  const t = useTranslations('auth.register');

  // State
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <form onSubmit={handleVerify} className="space-y-9">
      <RegisterHeader
        title={t('otp.title')}
        description={t.rich('otp.description', {
          email,
          edit: (chunks) => (
            <button type="button" onClick={onEdit} className="text-ds-info font-medium underline">
              {chunks}
            </button>
          ),
        })}
      />

      <div className="flex flex-col items-end gap-4">
        <InputOTP
          maxLength={OTP_LENGTH}
          value={code}
          onChange={setCode}
          containerClassName="w-full justify-center"
        >
          <InputOTPGroup>
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <InputOTPSlot key={index} index={index} aria-invalid={!!error} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {error && <FieldError className="w-full text-center">{error}</FieldError>}

        {/* Resend owns its own action call, loading state and cooldown. */}
        <ResendTimer email={email} />
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        disabled={code.length !== OTP_LENGTH}
        className="w-full"
      >
        {t('otp.verify')}
      </Button>
    </form>
  );
}
