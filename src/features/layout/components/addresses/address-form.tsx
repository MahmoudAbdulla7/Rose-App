'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import type z from 'zod';

import { Button } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { PhoneInput } from '@/shared/ui/phone-input';
import { Separator } from '@/shared/ui/separator';
import type { Address } from '../../lib/types/address';
import { createAddressSchema } from '../../lib/schemas/address.schema';

interface AddressFormProps {
  address: Address | null;
  onBack: () => void;
}

export default function AddressForm({ address, onBack }: AddressFormProps) {
  // Translation
  const t = useTranslations('address');
  const tAddressValidation = useTranslations('address.validation');
  const tRegisterValidation = useTranslations('auth.register.validation');

  const isEditing = !!address;

  // State
  const [step, setStep] = useState<1 | 2>(1);

  // Schema
  const addressSchema = createAddressSchema(tAddressValidation, tRegisterValidation);
  type AddressFormInput = z.infer<typeof addressSchema>;

  // Form
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      city: address?.city ?? '',
      street: address?.street ?? '',
      phone: address?.phone ?? '',
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-3">
        <div
          className={`h-2 flex-1 rounded-full ${step === 1 ? 'bg-ds-primary' : 'bg-ds-success'}`}
        />
        <div
          className={`h-2 flex-1 rounded-full ${
            step === 2 ? 'bg-ds-primary' : 'bg-ds-border-soft'
          }`}
        />
      </div>

      {/* Subtitle */}
      <div>
        <p className="text-ds-primary mt-1 text-2xl font-medium">
          {isEditing ? t('updated') : t('form.step1Title')}
        </p>
      </div>

      <Separator />

      {step === 1 ? (
        <form className="flex flex-col gap-5">
          <Input
            label={t('form.city')}
            placeholder={t('form.city')}
            error={errors.city?.message}
            {...register('city')}
          />

          <Input
            label={t('form.details')}
            placeholder={t('form.details')}
            error={errors.street?.message}
            {...register('street')}
          />

          <Field>
            <Controller
              control={control}
              name="phone"
              render={({ field, fieldState }) => (
                <PhoneInput
                  id="phone"
                  label={t('form.phone')}
                  placeholder={t('form.phone')}
                  defaultCountry="EG"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                />
              )}
            />
          </Field>

          <div className="mt-2 flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              {t('actions.back')}
            </Button>

            <Button type="submit" loading={isSubmitting}>
              {t('actions.next')}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex h-96 items-center justify-center rounded-lg border border-dashed">
            Map
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              {t('actions.back')}
            </Button>

            <Button>{address ? t('actions.save') : t('actions.add')}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
