import { getTranslations } from 'next-intl/server';

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
  const t = await getTranslations('review.summary');

  return (
    <section className={cn('flex flex-col gap-2.5', className)}>
      <p className="text-ds-text-plain text-xl leading-none font-semibold">
        {t('generalRating')}
      </p>

      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
          <span className="text-ds-text-plain text-2xl leading-none font-bold">
            {rating.toFixed(1)}
          </span>
          <span className="text-ds-text-muted text-lg leading-none font-medium">
            {t('ratingsCount', { count: ratingsCount })}
          </span>
        </div>

        <RatingStars
          rating={rating}
          size="sm"
          ariaLabel={t('rating', { rating, maxRating: 5 })}
        />
      </div>
    </section>
  );
}
