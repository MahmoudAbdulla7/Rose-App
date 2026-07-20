'use client';

import { Link } from '@/i18n/navigation';
import { buildFilterHref, PRODUCT_FILTER_KEYS } from '@/features/products/lib/utils/filter.utils';
import { useTranslations } from 'next-intl';
import RatingStarIcon from './rating-star-icon';
import { getStarFill } from '../../lib/utils/get-star-fill.utils';

export type RatingFilterStarItemProps = {
  searchParams: ISearchParams;
  rating: {
    star: number;
    selectedRating: number;
    activeRating: number;
  };
  actions: {
    onHover: (rating: number) => void;
    onLeave: () => void;
  };
};

export default function RatingFilterStarItem({
  searchParams,
  rating: { star, selectedRating, activeRating },
  actions: { onHover, onLeave },
}: RatingFilterStarItemProps) {
  const tActions = useTranslations('common.actions');
  const halfValue = star - 0.5;
  const fullValue = star;
  const fill = getStarFill(star, activeRating);

  return (
    <div className="relative size-6.25 shrink-0">
      <RatingStarIcon fill={fill} />

      <Link
        href={buildFilterHref(searchParams, PRODUCT_FILTER_KEYS.MIN_RATING, String(halfValue))}
        scroll={false}
        aria-label={tActions('selectRating', { rating: halfValue })}
        aria-current={selectedRating === halfValue ? 'true' : undefined}
        onMouseEnter={() => onHover(halfValue)}
        onFocus={() => onHover(halfValue)}
        onBlur={onLeave}
        className="focus-visible:ring-ds-ring absolute inset-y-0 start-0 z-10 w-1/2 rounded-s-sm focus-visible:ring-2 focus-visible:outline-none"
      />
      <Link
        href={buildFilterHref(searchParams, PRODUCT_FILTER_KEYS.MIN_RATING, String(fullValue))}
        scroll={false}
        aria-label={tActions('selectRating', { rating: fullValue })}
        aria-current={selectedRating === fullValue ? 'true' : undefined}
        onMouseEnter={() => onHover(fullValue)}
        onFocus={() => onHover(fullValue)}
        onBlur={onLeave}
        className="focus-visible:ring-ds-ring absolute inset-y-0 end-0 z-10 w-1/2 rounded-e-sm focus-visible:ring-2 focus-visible:outline-none"
      />
    </div>
  );
}
