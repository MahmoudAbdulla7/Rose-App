import { cn } from '@/shared/lib/utils';

import ReviewItem, { type ProductReview } from './review-item';

const defaultReviews: ProductReview[] = [
  {
    id: 'adrian-1',
    authorName: 'Adrian',
    dateLabel: 'Apr 7, 2025',
    rating: 4.5,
    title: 'Awesome Bouquet!',
    content:
      "I ordered this bouquet for a special occasion, and it absolutely exceeded my expectations! The flowers were fresh, beautifully arranged, and exactly as pictured-if not better. The color combination was stunning and gave off such a luxurious vibe. Even the wrapping was elegant and thoughtful. Delivery was right on time, and the bouquet arrived in perfect condition. The recipient was genuinely touched and couldn't stop admiring it. Highly recommend for anyone looking to make a lasting impression. Will definitely order again!",
  },
  {
    id: 'adrian-2',
    authorName: 'Adrian',
    dateLabel: 'Apr 7, 2025',
    rating: 4.5,
    title: 'Awesome Bouquet!',
    content:
      'I ordered this bouquet for a special occasion, and it absolutely exceeded my expectations! The flowers were fresh, beautifully arranged, and exactly as pictured-if not better.',
  },
];

type ProductReviewsSectionProps = {
  reviews?: ProductReview[];
  className?: string;
};

export default function ProductReviewsSection({
  reviews = defaultReviews,
  className,
}: ProductReviewsSectionProps) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section
      className={cn('max-h-125 scrollbar-none overflow-y-auto', className)}
      aria-label="Customer reviews"
    >
      <div className="divide-ds-border-subtle flex flex-col divide-y">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} className="py-8 first:pt-7 last:pb-0" />
        ))}
      </div>
    </section>
  );
}
