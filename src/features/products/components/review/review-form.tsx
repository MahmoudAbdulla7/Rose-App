'use client';

import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { useCreateReview } from '../../hooks/use-reviews';
import type { Review, ReviewInput } from '../../lib/types/review';
import ReviewRating from './review-rating';
import ReviewFormFields from './review-form-fields';
import { ReviewAuthGuard } from './review-auth-guard';

type ReviewFormValues = Omit<ReviewInput, 'productId'>;

type ReviewFormProps = {
  productId: string;
  onSubmitted?: (review: Review) => void;
};

export default function ReviewForm({ productId, onSubmitted }: ReviewFormProps) {
  // Translation
  const t = useTranslations('review.form');

  // Custom hooks
  const createReview = useCreateReview(productId);

  // Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: { rating: 0, headline: '', content: '' },
  });

  // Variables
  const rating = useWatch({
    control,
    name: 'rating',
  });

  // Functions
  const onSubmit = (values: ReviewFormValues) => {
    createReview.reset();

    createReview.mutate(
      {
        rating: values.rating,
        headline: values.headline.trim(),
        content: values.content.trim(),
      },
      {
        onSuccess: (review) => {
          reset({
            rating: 0,
            headline: '',
            content: '',
          });
          onSubmitted?.(review);
        },
      },
    );
  };

  // Effects
  useEffect(() => {
    register('rating', {
      validate: (value) => value > 0 || t('selectRating'),
    });
  }, [register, t]);

  return (
    <section className="relative m-4 w-1/3 overflow-hidden p-5">
      {/* Auth layer */}
      <ReviewAuthGuard>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={createReview.isPending} className="space-y-4">
            {/* Rating */}
            <ReviewRating
              rating={rating}
              error={errors.rating}
              onChange={(value) =>
                setValue('rating', value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />

            {/* Fields */}
            <ReviewFormFields register={register} errors={errors} />

            {createReview.error && (
              <p className="text-sm text-red-500">{createReview.error.message}</p>
            )}

            {/* Button */}
            <Button type="submit" loading={createReview.isPending} className="w-full">
              {t('submit')}
            </Button>
          </fieldset>
        </form>
      </ReviewAuthGuard>
    </section>
  );
}
