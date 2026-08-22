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
      className={cn(
        'max-h-91.75 scrollbar-none overflow-y-auto px-1.75 py-2',
        className,
      )}
      aria-label={t('customerReviews')}
    >
      <div className="flex flex-col gap-2.5">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
