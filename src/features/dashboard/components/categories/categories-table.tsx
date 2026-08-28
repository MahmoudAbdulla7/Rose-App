import { useTranslations } from 'next-intl';

import CategoryRowActions from './category-row-actions';
import type { ICategory } from '@/shared/lib/types/categories';

type Props = {
  categories: ICategory[];
};

export default function CategoriesTable({ categories }: Props) {
  // Translation
  const t = useTranslations('dashboard.categories.table');
  const tCommon = useTranslations('common.categories');

  return (
    <div className="border-ds-border-muted w-full overflow-x-auto rounded-lg border">
      <table className="w-full min-w-md table-fixed">
        <thead>
          <tr className="bg-ds-subtle border-ds-border-muted h-10 border-b">
            <th className="text-ds-text-plain w-2/5 px-5 text-start text-[13px] font-medium">
              {t('name')}
            </th>
            <th className="text-ds-text-plain px-5 text-start text-[13px] font-medium">
              {t('products')}
            </th>
            <th className="w-40 px-5">
              <span className="sr-only">{t('actions')}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-ds-border-muted hover:bg-ds-primary-fade h-15 border-b last:border-b-0"
            >
              <td className="text-ds-text-plain truncate px-5 text-sm font-semibold">
                {category.title}
              </td>

              <td className="text-ds-text-plain truncate px-5 text-sm">
                {tCommon('productCount', { count: category._count.products })}
              </td>

              <td className="px-5">
                <div className="flex items-center justify-end md:justify-start">
                  <CategoryRowActions categoryId={category.id} categoryTitle={category.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
