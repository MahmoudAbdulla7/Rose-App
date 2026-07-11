'use client';

import { useState, type SyntheticEvent } from 'react';
import { MoveRight, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/ui/button';
import { Field, FieldError } from '@/shared/ui/field';
import { PasswordInput } from '@/shared/ui/password-input';
import { registerAction } from '../../lib/actions/register.action';
import type { IRegisterFields } from '../../lib/types/register';
import { RegisterHeader } from '../register-header';

const STEP_FIELDS: (keyof IRegisterFields)[] = ['password', 'confirmPassword'];

export function Password() {
  // Translations
  const t = useTranslations('register');

  // Navigation
  const router = useRouter();

  // Form
  const {
    control,
    trigger,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<IRegisterFields>();

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Functions
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear any previous server error
    clearErrors('root.serverError');

    // Validate the fields in this step
    const isValid = await trigger(STEP_FIELDS);
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      // Submit the registration data to the server
      const res = await registerAction(getValues());

      // Handle server response
      if (!res.status) {
        setError('root.serverError', {
          message: res.message || t('messages.error'),
        });
        return;
      }

      toast.success(t('messages.success'));

      reset();

      router.push('/login');
    } catch {
      setError('root.serverError', { message: t('messages.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-9">
      {/* Header: page title + step header */}
      <RegisterHeader title={t('password.title')} description={t('password.subtitle')} />

      <div className="space-y-4 pt-5">
        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <PasswordInput
                id="password"
                label={t('fields.password')}
                placeholder={t('placeholder.password')}
                autoComplete="new-password"
                error={fieldState.error?.message}
                {...field}
              />
            </Field>
          )}
        />

        {/* Confirm password */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <PasswordInput
                id="confirmPassword"
                label={t('fields.confirm-password')}
                placeholder={t('placeholder.confirm-password')}
                autoComplete="new-password"
                error={fieldState.error?.message}
                {...field}
              />
            </Field>
          )}
        />
      </div>

      {/* Server error */}
      {errors.root?.serverError?.message && (
        <div
          role="alert"
          className="border-ds-danger/40 bg-ds-danger/5 min-h-input relative flex flex-col items-center justify-center rounded-lg border px-2 py-3.5 shadow-sm"
        >
          <span className="bg-background text-ds-danger absolute -top-3 left-1/2 flex -translate-x-1/2 px-1">
            <XCircle className="size-5.5" />
          </span>
          <FieldError className="text-center text-sm leading-relaxed">
            {errors.root.serverError.message}
          </FieldError>
        </div>
      )}

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
