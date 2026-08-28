import { Suspense } from 'react';

import CategoriesContent from '@/features/dashboard/components/categories/categories-content';
import CategoriesContentSkeleton from '@/features/dashboard/skeletons/categories-content.skeleton';
import LoadErrorBoundary from '@/shared/components/load-error-boundary';

type Props = {
  searchParams: Promise<ISearchParams>;
};

export default function DashboardCategoriesPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<CategoriesContentSkeleton />}>
      <LoadErrorBoundary entity="categories">
        <CategoriesContent searchParams={searchParams} />
      </LoadErrorBoundary>
    </Suspense>
  );
}
