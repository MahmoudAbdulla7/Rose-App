import { getTranslations } from 'next-intl/server';

import { buildOccasionHref } from '@/features/landing-page/lib/utils/occasion.utils';
import HoveredLink from '@/shared/components/hovered-link';
import type { IOccasion } from '@/shared/lib/types/occasions';
import { cn } from '@/shared/lib/utils';

export interface IPopularProductsOccasionsFilterProps {
  searchParams?: ISearchParams;
  occasions: IOccasion[];
}

export default async function PopularProductsOccasionsFilter({
  searchParams = {},
  occasions,
}: IPopularProductsOccasionsFilterProps) {
  const t = await getTranslations('product.popularProducts');

  if (!occasions.length) {
    return (
      <nav
        aria-busy="true"
        aria-label={t('filterLabel')}
        className="no-scrollbar flex h-4 w-full min-w-0 items-center gap-6 overflow-x-auto lg:flex-1 lg:justify-end"
      />
    );
  }

  const rawOccasion = searchParams.occasion;
  const activeOccasionId = Array.isArray(rawOccasion) ? rawOccasion[0] : rawOccasion;

  return (
    <nav
      aria-label={t('filterLabel')}
      className="no-scrollbar flex w-full min-w-0 items-center gap-6 overflow-x-auto lg:flex-1 lg:justify-end"
    >
      {occasions.map((occasion) => {
        const isActive = activeOccasionId === occasion.id;

        return (
          <HoveredLink
            key={occasion.id}
            href={buildOccasionHref(searchParams, occasion.id)}
            aria-current={isActive ? 'page' : undefined}
            scroll={false}
            className={cn(
              'shrink-0 cursor-pointer text-base leading-none font-medium whitespace-nowrap transition-colors',
              isActive
                ? 'text-maroon-600 dark:text-soft-pink-200'
                : 'hover:text-maroon-600 dark:hover:text-soft-pink-200 text-zinc-700 dark:text-zinc-400',
            )}
          >
            {occasion.title}
          </HoveredLink>
        );
      })}
    </nav>
  );
}
