import { cn } from '@/shared/lib/utils';
import { Star } from 'lucide-react';
import type { RatingStarIconProps } from '../../lib/utils/get-star-fill.utils';

export default function RatingStarIcon({ fill }: RatingStarIconProps) {
  return (
    <span className="relative block size-6.25" aria-hidden="true">
      <Star
        strokeWidth={1.5}
        className="size-6.25 fill-transparent text-zinc-300 dark:text-zinc-600"
      />
      {fill !== 'empty' && (
        <span
          className={cn(
            'absolute inset-y-0 start-0 overflow-hidden',
            fill === 'half' ? 'w-1/2' : 'w-full',
          )}
        >
          <Star strokeWidth={1.5} className="fill-ds-warning text-ds-warning size-6.25" />
        </span>
      )}
    </span>
  );
}
