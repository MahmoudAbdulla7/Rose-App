import { getLocale, getTranslations } from 'next-intl/server';

import CategoryCard from '@/features/landing-page/components/categories/category-card';
import CategoriesPagination from '@/features/landing-page/components/categories/categories-pagination';
import { getLandingPageCategories } from '@/features/landing-page/lib/services/categories.service';
import EmptyState from '@/shared/components/empty-state';

type CategoriesGridProps = {
  searchParams: Promise<ISearchParams>;
};

export default async function CategoriesGrid({ searchParams }: CategoriesGridProps) {
  const t = await getTranslations('common');
  const locale = await getLocale();
  const resolvedSearchParams = await searchParams;
  const { categories, metadata } = await getLandingPageCategories({
    searchParams: resolvedSearchParams,
    options: { locale },
  });

  if (!categories.length) {
    return (
      <EmptyState
        title={t('emptyState.title')}
        subtitle={t('emptyState.description', { entity: t('entities.categories') })}
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            className="w-full min-w-0"
            priority={index < 4}
          />
        ))}
      </div>

      <CategoriesPagination metadata={metadata} />
    </div>
  );
}
