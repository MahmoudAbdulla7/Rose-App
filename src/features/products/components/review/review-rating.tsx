'use client';

import type { FieldError } from 'react-hook-form';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils';

type RatingInputProps = {
  rating: number;
  error?: FieldError;
  onChange: (rating: number) => void;
};

export default function ReviewRating({ rating, error, onChange }: RatingInputProps) {
  const t = useTranslations('review.form');

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2.5">
        {/* Label */}
        <span className="font-medium">{t('rating')}</span>
        {/* Stars */}
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            const selected = value <= rating;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={value === rating}
                aria-label={`${value} star${value === 1 ? '' : 's'}`}
                onClick={() => onChange(value)}
                className="outline-none"
              >
                <Star
                  strokeWidth={1.5}
                  size={25}
                  className={cn('text-amber-400', selected && 'fill-amber-400')}
                />
              </button>
            );
          })}
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
