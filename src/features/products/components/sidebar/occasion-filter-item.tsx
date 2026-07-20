'use client';

import { Link } from '@/i18n/navigation';
import { buildFilterHref, PRODUCT_FILTER_KEYS } from '@/features/products/lib/utils/filter.utils';
import type { IOccasion } from '@/shared/lib/types/occasions';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export type OccasionFilterItemProps = {
  occasion: IOccasion;
  searchParams: ISearchParams;
  isSelected: boolean;
};

export default function OccasionFilterItem({
  occasion,
  searchParams,
  isSelected,
}: OccasionFilterItemProps) {
  const tActions = useTranslations('common.actions');

  return (
    <Link
      href={buildFilterHref(searchParams, PRODUCT_FILTER_KEYS.OCCASION, occasion.id)}
      scroll={false}
      aria-current={isSelected ? 'true' : undefined}
      aria-label={tActions('selectOccasion', { name: occasion.title })}
      className={cn(
        'focus-visible:ring-ds-ring relative flex size-full items-center justify-center overflow-hidden rounded-lg pe-2.5 transition-opacity focus-visible:ring-2 focus-visible:outline-none',
        'hover:opacity-90 active:opacity-80',
      )}
    >
      <Image src={occasion.image} alt="" fill sizes="133px" className="object-cover" />
      <span
        className={cn(
          'absolute inset-0',
          isSelected
            ? 'to-maroon-600/55 bg-linear-to-b from-black/14'
            : 'bg-linear-to-b from-black/40 to-black/80',
        )}
        aria-hidden="true"
      />
      <span className="relative z-10 text-center text-base leading-none font-medium text-zinc-50">
        {occasion.title}
      </span>
    </Link>
  );
}
