import { Link } from '@/i18n/navigation';
import { buildFilterHref, PRODUCT_FILTER_KEYS } from '@/features/products/lib/utils/filter.utils';
import type { ICategory } from '@/shared/lib/types/categories';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export type CategoryFilterItemProps = {
  category: ICategory;
  searchParams: ISearchParams;
  isSelected: boolean;
};

export default function CategoryFilterItem({
  category,
  searchParams,
  isSelected,
}: CategoryFilterItemProps) {
  /* Translations */
  const tActions = useTranslations('common.actions');

  return (
    <Link
      href={buildFilterHref(searchParams, PRODUCT_FILTER_KEYS.CATEGORY, category.id)}
      scroll={false}
      aria-current={isSelected ? 'true' : undefined}
      aria-label={tActions('selectCategory', { name: category.title })}
      className={cn(
        'focus-visible:ring-ds-ring flex h-9 w-full items-center gap-2.5 rounded-sm pe-2.5 transition-colors focus-visible:ring-2 focus-visible:outline-none',
        isSelected
          ? 'bg-maroon-50 dark:bg-ds-primary-fade'
          : 'bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-600',
      )}
    >
      <span
        className={cn(
          'relative flex size-9 shrink-0 items-center justify-center overflow-hidden',
          isSelected ? 'bg-maroon-600 dark:bg-ds-primary' : 'bg-zinc-500',
        )}
      >
        <Image
          src={category.image}
          alt=""
          width={21}
          height={21}
          className="size-5.25 object-cover"
        />
      </span>
      <span className="truncate text-sm leading-none font-medium text-zinc-800 dark:text-zinc-100">
        {category.title}
      </span>
    </Link>
  );
}
