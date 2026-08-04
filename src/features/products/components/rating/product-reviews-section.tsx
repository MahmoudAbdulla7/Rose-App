import { getTranslations } from 'next-intl/server';

import EmptyState from '@/shared/components/empty-state';
import type { IReview } from '@/shared/lib/types/single-product';
import { cn } from '@/shared/lib/utils';

import ReviewItem from './review-item';

type ProductReviewsSectionProps = {
  reviews?: IReview[] | null;
  className?: string;
};

export default async function ProductReviewsSection({
  reviews,
  className,
}: ProductReviewsSectionProps) {
  const t = await getTranslations('product.productDetails.reviews');
  const normalizedReviews = reviews ?? [];

  if (normalizedReviews.length === 0) {
    return (
      <section className={className} aria-label={t('customerReviews')}>
        <EmptyState
          title={t('emptyState.title')}
          subtitle={t('emptyState.description')}
          className="min-h-64 rounded-lg py-12"
        />
      </section>
    );
  }

  return (
    <section
      className={cn('max-h-125 scrollbar-none overflow-y-auto', className)}
      aria-label={t('customerReviews')}
    >
      <div className="divide-ds-border-subtle flex flex-col divide-y">
        {normalizedReviews.map((review) => (
          <ReviewItem key={review.id} review={review} className="py-8 first:pt-7 last:pb-0" />
        ))}
      </div>
    </section>
  );
}
