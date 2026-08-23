import { Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/utils';

type ProductRatingProps = {
  rating?: number;
  maxRating?: number;
};

export default async function ProductRating({ rating = 0, maxRating = 4 }: ProductRatingProps) {
  const t = await getTranslations('product');

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={t('rating', { rating, maxRating })}
      aria-live="polite"
    >
      {Array.from({ length: maxRating }, (_, index) => {
        const isFilled = index < Math.round(rating);

        return (
          <Star
            key={index}
            className={cn(
              'size-4 shrink-0',
              isFilled ? 'fill-yellow-500 text-yellow-500' : 'fill-none text-zinc-300',
            )}
            style={{
              color: 'var(--color-yellow-500)',
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
