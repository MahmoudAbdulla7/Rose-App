'use client';

import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import RatingFilterStarItem from './rating-filter-star-item';

export type RatingFilterStarsProps = {
  searchParams: ISearchParams;
  selectedRating: number;
};

export default function RatingFilterStars({
  searchParams,
  selectedRating,
}: RatingFilterStarsProps) {
  const tFilters = useTranslations('common.filters');
  const [hoveredRating, setHoveredRating] = useState(0);

  const activeRating = hoveredRating || selectedRating;

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label={tFilters('rating')}
      onMouseLeave={() => setHoveredRating(0)}
    >
      {Array.from({ length: PRODUCTS_OPTIONS.MAX_RATING }, (_, index) => {
        const star = index + 1;

        return (
          <RatingFilterStarItem
            key={star}
            searchParams={searchParams}
            rating={{ star, selectedRating, activeRating }}
            actions={{ onHover: setHoveredRating, onLeave: () => setHoveredRating(0) }}
          />
        );
      })}
    </div>
  );
}
