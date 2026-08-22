'use client';

import type { FieldError } from 'react-hook-form';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils';

type RatingInputProps = {
  rating: number;
  error?: FieldError;
  onChange: (rating: number) => void;
};

export default function ReviewRating({ rating, error, onChange }: RatingInputProps) {
  const t = useTranslations('review.form');
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="space-y-1 py-2.5">
      <div className="flex items-center gap-2.5">
        <span className="text-ds-text-plain text-base font-medium">{t('rating')}</span>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            const selected = value <= (hoveredRating || rating);
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={value === rating}
                aria-label={`${value} star${value === 1 ? '' : 's'}`}
                onClick={() => onChange(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                className="rounded-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
              >
                <Star
                  strokeWidth={1.5}
                  size={25}
                  className={cn(
                    'cursor-pointer text-amber-400 transition-colors',
                    selected && 'fill-amber-400',
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
      {error && <p className="text-ds-danger text-xs">{error.message}</p>}
    </div>
  );
}
