'use client';

import { Controller, useForm } from 'react-hook-form';
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
    control,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: { rating: 0, headline: '', content: '' },
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
          reset();
          onSubmitted?.(review);
        },
      },
    );
  };

  return (
    <section className="relative container m-4 w-1/3 overflow-hidden p-5">
      {/* Auth layer */}
      <ReviewAuthGuard>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={createReview.isPending} className="space-y-4">
            {/* Rating */}
            <Controller
              name="rating"
              control={control}
              rules={{
                validate: (value) => value > 0 || t('selectRating'),
              }}
              render={({ field, fieldState }) => (
                <ReviewRating
                  rating={field.value}
                  error={fieldState.error}
                  onChange={field.onChange}
                />
              )}
            />

            {/* Fields */}
            <ReviewFormFields register={register} errors={errors} />

            {createReview.error && (
              <p className="text-ds-danger text-xs">{createReview.error.message}</p>
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
