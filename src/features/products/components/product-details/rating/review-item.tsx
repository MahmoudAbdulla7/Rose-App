import { cn } from '@/shared/lib/utils';

import RatingStars from './rating-stars';

export type ProductReview = {
  id: string;
  authorName: string;
  authorInitial?: string;
  dateLabel: string;
  rating: number;
  title: string;
  content: string;
};

type ReviewItemProps = {
  review: ProductReview;
  className?: string;
};

export default function ReviewItem({ review, className }: ReviewItemProps) {
  const authorInitial = review.authorInitial ?? review.authorName.charAt(0).toUpperCase();

  return (
    <article className={cn('flex gap-3 sm:gap-4', className)}>
      <div className="min-w-0 flex-1">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-ds-primary text-ds-text-inverse flex size-12 shrink-0 items-center justify-center rounded-full text-xl font-semibold">
              {authorInitial}
            </div>

            <div>
              <h3 className="text-ds-text-plain text-lg leading-tight font-bold">
                {review.authorName}
              </h3>
              <p className="text-ds-text-muted text-sm leading-tight font-semibold">
                {review.dateLabel}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <RatingStars rating={review.rating} size="md" />
            <span className="text-ds-text-plain text-xl leading-none font-bold">
              ({review.rating.toFixed(1)})
            </span>
          </div>
        </header>

        <div className="mt-5 flex flex-col gap-2">
          <h4 className="text-lg leading-tight font-semibold text-black dark:text-white">
            {review.title}
          </h4>
          <p className="text-ds-text-default text-lg leading-snug">{review.content}</p>
        </div>
      </div>
    </article>
  );
}
