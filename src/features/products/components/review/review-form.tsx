'use client';

import { Controller, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import { useCreateReview } from '../../hooks/use-reviews';
import type { Review, ReviewInput } from '../../lib/types/review';
import ReviewRating from './review-rating';
import ReviewFormFields from './review-form-fields';
import { ReviewAuthGuard } from './review-auth-guard';

type ReviewFormValues = Omit<ReviewInput, 'productId'>;

type ReviewFormProps = {
  productId: string;
  className?: string;
  onSubmitted?: (review: Review) => void;
};

export default function ReviewForm({ productId, className, onSubmitted }: ReviewFormProps) {
  const t = useTranslations('review.form');
  const createReview = useCreateReview(productId);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: { rating: 0, headline: '', content: '' },
  });

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
    <section className={cn('flex flex-col justify-between', className)}>
      <ReviewAuthGuard>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <fieldset disabled={createReview.isPending} className="flex flex-col gap-4">
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

            <ReviewFormFields register={register} errors={errors} />

            {createReview.error && (
              <p className="text-ds-danger text-xs">{createReview.error.message}</p>
            )}

            <Button
              type="submit"
              loading={createReview.isPending}
              className="h-auto w-full rounded-[10px] px-4 py-3.5 text-base font-medium"
            >
              {t('submit')}
            </Button>
          </fieldset>
        </form>
      </ReviewAuthGuard>
    </section>
  );
}
