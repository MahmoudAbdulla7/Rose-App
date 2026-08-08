import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { PhoneInput } from '@/shared/ui/phone-input';
import type { AddressFormInput } from '../../lib/types/address';

interface AddressFormStepOneProps {
  register: UseFormRegister<AddressFormInput>;
  control: Control<AddressFormInput>;
  errors: FieldErrors<AddressFormInput>;
  isSubmitting: boolean;
  goToStepTwo: () => void;
}

export default function AddressStepOne({
  register,
  control,
  errors,
  isSubmitting,
  goToStepTwo,
}: AddressFormStepOneProps) {
  const t = useTranslations('address');

  return (
    <form onSubmit={goToStepTwo} className="flex flex-col gap-5">
      {/* City */}
      <Input
        label={t('form.city')}
        placeholder={t('form.city')}
        error={errors.city?.message}
        {...register('city')}
      />

      {/* Street */}
      <Input
        label={t('form.details')}
        placeholder={t('form.details')}
        error={errors.street?.message}
        {...register('street')}
      />

      {/* Phone */}
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

      <Button type="submit" loading={isSubmitting}>
        {t('actions.next')}
      </Button>
    </form>
  );
}
