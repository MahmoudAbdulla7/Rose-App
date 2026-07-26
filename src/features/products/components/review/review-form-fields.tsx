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
      {/* Title */}
      <div>
        <Input
          label={t('title')}
          placeholder={t('titlePlaceholder')}
          error={errors.headline?.message}
          {...register('headline', {
            required: tValidation('required.title'),
          })}
        />
      </div>

      {/* Content */}
      <label htmlFor="content" className="text-sm">
        {t('content')}
      </label>
      <div>
        <Textarea
          id="content"
          placeholder={t('contentPlaceholder')}
          {...register('content', {
            required: tValidation('required.content'),
          })}
          className="mt-1.5"
        />
        {errors.content && <p className="text-ds-danger mt-2 text-xs">{errors.content.message}</p>}
      </div>
    </>
  );
}
