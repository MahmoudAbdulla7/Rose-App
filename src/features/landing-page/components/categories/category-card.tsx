import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { PRODUCT_FILTER_KEYS } from '@/features/products/lib/utils/filter.utils';
import BlurredImagePlaceholder from '@/shared/components/blurred-image-placeholder';
import HoveredLink from '@/shared/components/hovered-link';
import type { ICategory } from '@/shared/lib/types/categories';
import { cn } from '@/shared/lib/utils';

export interface ICategoryCardProps {
  category: ICategory;
  className?: string;
  priority?: boolean;
}

export default async function CategoryCard({
  category,
  className,
  priority = false,
}: ICategoryCardProps) {
  const t = await getTranslations('common.categories');
  const { id, title, description, image, _count } = category;
  const nameId = `category-name-${id}`;
  const href = `/products?${PRODUCT_FILTER_KEYS.CATEGORY}=${id}`;
  const productCount = _count?.products ?? 0;

  return (
    <article
      className={cn('group flex w-full min-w-0 flex-col gap-4 rounded-4xl', className)}
      data-category-id={id}
      aria-labelledby={nameId}
    >
      <HoveredLink
        href={href}
        className="flex w-full flex-col gap-4 focus-visible:outline-none"
        aria-labelledby={nameId}
        aria-label={t('viewCategory', { name: title })}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
          ) : (
            <BlurredImagePlaceholder />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/40 from-0% via-20% to-transparent to-70% opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <h3
            id={nameId}
            title={title}
            className="text-maroon-700 dark:text-soft-pink-200 truncate text-lg leading-none font-semibold"
          >
            {title}
          </h3>

          <p title={description} className="line-clamp-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {description ?? "-"}
          </p>

          <p className="text-maroon-600 dark:text-soft-pink-300 text-sm font-medium">
            {t('productCount', { count: productCount })}
          </p>
        </div>
      </HoveredLink>
    </article>
  );
}
