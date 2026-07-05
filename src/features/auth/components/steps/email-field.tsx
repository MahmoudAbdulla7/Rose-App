'use client';

import { useState, type SyntheticEvent } from 'react';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { sendEmailVerificationAction } from '../../lib/actions/send-email-verification.action';
import type { IRegisterFields } from '../../lib/types/register';

interface IEmailFieldProps {
  onVerified: () => void;
}

export function EmailField({ onVerified }: IEmailFieldProps) {
  // Translation
  const t = useTranslations('register');

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form
  const { control, trigger, getValues, setError } = useFormContext<IRegisterFields>();

  // Functions
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate the email field
    const isValid = await trigger('email');
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const email = getValues('email');
      const res = await sendEmailVerificationAction(email);

      if (!res.status) {
        setError('email', { type: 'server', message: res.message });
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
    <form onSubmit={handleSubmit} className="space-y-9">
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input
              {...field}
              id="email"
              type="text"
              label={t('fields.email')}
              placeholder={t('placeholder.email')}
              autoComplete="email"
              error={fieldState.error?.message}
            />
          </Field>
        )}
      />

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        rightIcon={<MoveRight className="size-4.5 rtl:rotate-180" />}
        className="h-10.25 w-full"
      >
        {t('actions.next')}
      </Button>
    </form>
  );
}
