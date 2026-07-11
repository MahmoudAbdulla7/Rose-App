'use client';

import { type SyntheticEvent } from 'react';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { PhoneInput } from '@/shared/ui/phone-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { GENDER } from '../../lib/constants/gender.constant';
import type { IRegisterFields } from '../../lib/types/register';
import { RegisterHeader } from '../register-header';

interface IUserInfoProps {
  onNext: () => void;
}

/** Fields included in this step; ensures all keys exist in IRegisterFields */
const STEP_FIELDS: (keyof IRegisterFields)[] = [
  'firstName',
  'lastName',
  'username',
  'phone',
  'gender',
];

export function UserInfo({ onNext }: IUserInfoProps) {
  // Translation
  const t = useTranslations('register');

  // Form
  const { control, trigger } = useFormContext<IRegisterFields>();

  // Functions
  const handleNext = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = await trigger(STEP_FIELDS);
    if (!isValid) return;

    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-9">
      {/* Header: page title + step header */}
      <RegisterHeader title={t('details.title')} description={t('details.subtitle')} />

      <div className="space-y-4">
        {/* First + last name */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          {/* First name */}
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  id="firstName"
                  type="text"
                  label={t('fields.first-name')}
                  placeholder={t('placeholder.first-name')}
                  autoComplete="given-name"
                  error={fieldState.error?.message}
                  {...field}
                />
              </Field>
            )}
          />

          {/* Last name */}
          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  id="lastName"
                  type="text"
                  label={t('fields.last-name')}
                  placeholder={t('placeholder.last-name')}
                  autoComplete="family-name"
                  error={fieldState.error?.message}
                  {...field}
                />
              </Field>
            )}
          />
        </div>

        {/* Username */}
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                id="username"
                type="text"
                label={t('fields.username')}
                placeholder={t('placeholder.username')}
                autoComplete="username"
                error={fieldState.error?.message}
                {...field}
              />
            </Field>
          )}
        />

        {/* Phone */}
        <Field>
          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <PhoneInput
                id="phone"
                label={t('fields.phone')}
                placeholder={t('placeholder.phone')}
                defaultCountry="EG"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />
        </Field>

        {/* Gender */}
        <Field>
          <FieldLabel htmlFor="gender">{t('fields.gender')}</FieldLabel>

          <Controller
            control={control}
            name="gender"
            render={({ field, fieldState }) => (
              <>
                <Select
                  name={field.name}
                  value={field.value ?? null}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="gender" className="w-full">
                    <SelectValue placeholder={t('placeholder.gender')}>
                      {(value) =>
                        value
                          ? t(`gender-options.${(value as string).toLowerCase()}`)
                          : t('placeholder.gender')
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(GENDER).map((option) => (
                      <SelectItem key={option} value={option}>
                        {t(`gender-options.${option.toLowerCase()}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.error?.message && <FieldError>{fieldState.error.message}</FieldError>}
              </>
            )}
          />
        </Field>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        rightIcon={<MoveRight className="size-4.5 rtl:rotate-180" />}
        className="h-10.25 w-full"
      >
        {t('actions.next')}
      </Button>
    </form>
  );
}
