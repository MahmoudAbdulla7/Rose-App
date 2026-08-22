import { getTranslations } from 'next-intl/server';

import EmptyState from '@/shared/components/empty-state';
import type { IReview } from '@/shared/lib/types/single-product';
import { cn } from '@/shared/lib/utils';

import ReviewItem from './review-item';

type ProductReviewsSectionProps = {
  reviews: IReview[];
  className?: string;
};

export default async function ProductReviewsSection({
  reviews,
  className,
}: ProductReviewsSectionProps) {
  const t = await getTranslations('product');

  if (reviews.length === 0) {
    return (
      <section
        className={cn('min-w-0 flex-1', className)}
        aria-label={t('productDetails.reviews.customerReviews')}
      >
        <EmptyState
          title={t('productDetails.reviews.emptyState.title')}
          subtitle={t('productDetails.reviews.emptyState.description')}
          className="min-h-91.75 py-8"
        />
      </section>
    );
  }

  return (
    <section
      className={cn(
        'max-h-91.75 scrollbar-none overflow-y-auto px-1.75 py-2',
        className,
      )}
      aria-label={t('productDetails.reviews.customerReviews')}
    >
      <div className="flex flex-col gap-2.5">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
