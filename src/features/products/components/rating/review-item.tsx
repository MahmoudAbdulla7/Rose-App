import { getFormatter, getTranslations } from 'next-intl/server';

import type { IReview } from '@/shared/lib/types/single-product';
import { cn } from '@/shared/lib/utils';

import RatingStars from './rating-stars';

type ReviewItemProps = {
  review: IReview;
  className?: string;
};

export default async function ReviewItem({ review, className }: ReviewItemProps) {
  const [format, t] = await Promise.all([getFormatter(), getTranslations('review')]);
  const createdAt =
    review.createdAt instanceof Date ? review.createdAt : new Date(String(review.createdAt));
  const authorName =
    [review.user.firstName, review.user.lastName].filter(Boolean).join(' ') || review.user.username;

  return (
    <article className={cn('flex gap-3 sm:gap-4', className)}>
      <div className="min-w-0 flex-1">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-ds-primary text-ds-text-inverse flex size-12 shrink-0 items-center justify-center rounded-full text-xl font-semibold">
              {authorName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="text-ds-text-plain text-lg leading-tight font-bold">{authorName}</h3>
              <time
                dateTime={createdAt.toISOString()}
                className="text-ds-text-muted text-sm leading-tight font-semibold"
              >
                {format.dateTime(createdAt, { dateStyle: 'long' })}
              </time>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <RatingStars
              rating={review.rating}
              size="md"
              ariaLabel={t('summary.rating', { rating: review.rating, maxRating: 5 })}
            />
            <span className="text-ds-text-plain text-xl leading-none font-bold">
              ({review.rating.toFixed(1)})
            </span>
          </div>
        </header>

        <div className="mt-5 flex flex-col gap-2">
          <h4 className="text-lg leading-tight font-semibold text-black dark:text-white">
            {review.headline}
          </h4>
          {review.content && (
            <p className="text-ds-text-default text-lg leading-snug">{review.content}</p>
          )}
        </div>
      </div>
    </article>
  );
}
