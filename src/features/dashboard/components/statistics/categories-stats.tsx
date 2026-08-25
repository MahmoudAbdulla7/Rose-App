import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';
import { Category } from '../lib/types/stats';

type CategoriesStatsProps = {
  categories?: Category[];
};

export default function CategoriesStats({ categories = [] }: CategoriesStatsProps) {
  const t = useTranslations('dashboard.lists');

  const sortedCategories = [...categories].sort((a, b) => b.productCount - a.productCount);

  return (
    <div className="bg-ds-plain flex h-81.5 flex-col rounded-3xl p-6">
      {/* Title */}
      <h2 className="mb-4 text-2xl font-semibold">{t('allCategories')}</h2>

      <div className="scrollbar-thumb-ds-text-subtle flex min-h-0 flex-1 scrollbar-thin flex-col gap-2.25 overflow-y-auto pe-1">
        {/* Item */}
        {sortedCategories.map((category) => (
          <Fragment key={category.id}>
            <div className="flex items-center justify-between gap-3">
              {/* Title */}
              <span className="min-w-0 truncate">{category.title}</span>

              {/* Count */}
              <Badge variant="subtle" className="shrink-0">
                {category.productCount} {category.productCount === 1 ? t('product') : t('products')}
              </Badge>
            </div>

            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
