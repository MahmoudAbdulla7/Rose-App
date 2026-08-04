import { getTranslations } from 'next-intl/server';

import SectionHeading from '@/features/landing-page/components/home/section-heading';
import { cn } from '@/shared/lib/utils';

import RatingStars from './rating-stars';

type GeneralRatingSectionProps = {
  rating: number;
  ratingsCount: number;
  className?: string;
};

export default async function GeneralRatingSection({
  rating,
  ratingsCount,
  className,
}: GeneralRatingSectionProps) {
  const t = await getTranslations('product');

  return (
    <section
      className={cn('border-ds-border-muted flex flex-col gap-4 border-b', className)}
      aria-labelledby="product-reviews-title"
    >
      <SectionHeading id="product-reviews-title">
        {t('productDetails.reviews.title')}
      </SectionHeading>

      <div className="flex flex-col gap-2">
        <p className="text-ds-text-plain text-xl leading-tight font-semibold">
          {t('productDetails.reviews.generalRating')}
        </p>

        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
          <span className="text-ds-text-plain text-2xl leading-none font-bold">
            {rating.toFixed(1)}
          </span>
          <span className="text-ds-text-muted text-lg leading-none">
            {t('productDetails.ratingsCount', { count: ratingsCount })}
          </span>
        </div>
        <div className="mb-4">
          <RatingStars
            rating={rating}
            size="lg"
            ariaLabel={t('rating', { rating, maxRating: 5 })}
          />
        </div>
      </div>
    </section>
  );
}
