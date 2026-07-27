import { Star } from 'lucide-react';

import { getStarFill } from '@/features/products/lib/utils/get-star-fill.utils';
import { cn } from '@/shared/lib/utils';

type RatingStarsProps = {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const starSizeClassName = {
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-7',
};

export default function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  className,
}: RatingStarsProps) {
  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="img"
      aria-label={`${rating} out of ${maxRating} stars`}
    >
      {Array.from({ length: maxRating }, (_, index) => {
        const star = index + 1;
        const fill = getStarFill(star, rating);

        return (
          <span key={star} className={cn('relative block shrink-0', starSizeClassName[size])}>
            <Star
              strokeWidth={1.5}
              className={cn(
                'fill-transparent text-zinc-300 dark:text-zinc-600',
                starSizeClassName[size],
              )}
              aria-hidden="true"
            />

            {fill !== 'empty' && (
              <span
                className={cn(
                  'absolute inset-y-0 start-0 overflow-hidden',
                  fill === 'half' ? 'w-1/2' : 'w-full',
                )}
                aria-hidden="true"
              >
                <Star
                  strokeWidth={1.5}
                  className={cn('fill-ds-warning text-ds-warning', starSizeClassName[size])}
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
