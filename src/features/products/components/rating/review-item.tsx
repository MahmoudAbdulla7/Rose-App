import { getFormatter, getTranslations } from 'next-intl/server';

import type { IReview } from '@/shared/lib/types/single-product';
import { cn } from '@/shared/lib/utils';

import RatingStars from './rating-stars';

type ReviewItemProps = {
  review: IReview;
  className?: string;
};

export default async function ReviewItem({ review, className }: ReviewItemProps) {
  const [format, t] = await Promise.all([getFormatter(), getTranslations('review.summary')]);
  const createdAt =
    review.createdAt instanceof Date ? review.createdAt : new Date(String(review.createdAt));
  const authorName =
    [review.user.firstName, review.user.lastName].filter(Boolean).join(' ') || review.user.username;

  return (
    <article
      className={cn(
        'border-ds-border-muted flex flex-col gap-2.5 border-b pb-4 last:border-b-0 last:pb-0',
        className,
      )}
    >
      <div className="flex items-center gap-2.5 px-0.75">
        <div className="bg-ds-primary text-ds-text-inverse flex size-11.25 shrink-0 items-center justify-center rounded-full text-xl font-semibold">
          {authorName.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <h3 className="text-ds-text-plain text-base leading-none font-semibold">{authorName}</h3>
          <time
            dateTime={createdAt.toISOString()}
            className="text-ds-text-muted text-sm leading-none font-medium"
          >
            {format.dateTime(createdAt, { dateStyle: 'medium' })}
          </time>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <RatingStars
          rating={review.rating}
          size="sm"
          ariaLabel={t('rating', { rating: review.rating, maxRating: 5 })}
        />
        <span className="text-ds-text-plain text-base leading-none font-semibold">
          ({review.rating.toFixed(1)})
        </span>
      </div>

      <div className="flex flex-col gap-1.5 pt-1">
        <h4 className="text-base leading-none font-semibold text-black dark:text-white">
          {review.headline}
        </h4>
        {review.content && (
          <p className="text-base leading-snug text-zinc-600 dark:text-zinc-400">{review.content}</p>
        )}
      </div>
    </article>
  );
}
