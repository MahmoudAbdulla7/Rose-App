'use client';

import { useState, type SyntheticEvent } from 'react';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field';
import { PasswordInput } from '@/shared/ui/password-input';
import { registerAction } from '../lib/actions/register.action';
import type { IRegisterFields } from '../lib/types/register';
import { RegisterHeader } from './register-header';

/** Fields collected in this step; validated before submitting. */
const STEP_FIELDS: (keyof IRegisterFields)[] = ['password', 'confirmPassword'];

export function Password() {
  // Translations
  const t = useTranslations('register');

  // Navigation
  const router = useRouter();

  // Form
  const { control, trigger, getValues, reset } = useFormContext<IRegisterFields>();

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Functions
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = await trigger(STEP_FIELDS);
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const res = await registerAction(getValues());

      if (!res.status) {
        toast.error(res.message || t('messages.error'));
        return;
      }

      toast.success(t('messages.success'));
      reset();
      router.push('/login');
    } catch {
      toast.error(t('messages.error'));
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

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        rightIcon={<MoveRight className="size-4.5 rtl:rotate-180" />}
        className="bg-maroon-600 hover:bg-maroon-700 h-10.25 w-full"
      >
        {t('actions.next')}
      </Button>
    </form>
  );
}
