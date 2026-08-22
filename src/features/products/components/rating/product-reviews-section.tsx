import { getTranslations } from 'next-intl/server';

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
  if (reviews.length === 0) {
    return null;
  }

  const t = await getTranslations('product.productDetails.reviews');

  return (
    <section
      className={cn('max-h-125 scrollbar-none overflow-y-auto', className)}
      aria-label={t('customerReviews')}
    >
      <div className="divide-ds-border-subtle flex flex-col divide-y">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} className="py-8 first:pt-7 last:pb-0" />
        ))}
      </div>
    </section>
  );
}
