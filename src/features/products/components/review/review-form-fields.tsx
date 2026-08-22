'use client';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import type { ReviewInput } from '../../lib/types/review';

type ReviewFormValues = Omit<ReviewInput, 'productId'>;

type ReviewFormFieldsProps = {
  register: UseFormRegister<ReviewFormValues>;
  errors: FieldErrors<ReviewFormValues>;
};

export default function ReviewFormFields({ register, errors }: ReviewFormFieldsProps) {
  const t = useTranslations('review.form');
  const tValidation = useTranslations('review.validation');

  return (
    <>
      <Input
        label={t('title')}
        placeholder={t('titlePlaceholder')}
        error={errors.headline?.message}
        className="rounded-[10px] px-4 py-4 text-sm"
        {...register('headline', {
          required: tValidation('required.title'),
        })}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="text-ds-text-plain text-sm font-medium">
          {t('content')}
        </label>
        <Textarea
          id="content"
          placeholder={t('contentPlaceholder')}
          {...register('content', {
            required: tValidation('required.content'),
          })}
          className="min-h-0 rounded-[10px] px-4 py-4 text-sm"
        />
        {errors.content && <p className="text-ds-danger text-xs">{errors.content.message}</p>}
      </div>
    </>
  );
}
