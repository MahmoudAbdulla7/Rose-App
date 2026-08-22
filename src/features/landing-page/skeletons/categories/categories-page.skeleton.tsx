import CategoryCardSkeleton from '@/features/landing-page/skeletons/categories/category-card.skeleton';
import { CATEGORIES_OPTIONS } from '@/shared/lib/apis/categories/categories.options';
import Skeleton from '@/shared/ui/skeleton';

function CategoriesHeadingSkeleton() {
  return (
    <div
      className="text-maroon-700 dark:text-soft-pink-200 relative isolate shrink-0 text-4xl leading-none font-bold"
      aria-hidden="true"
    >
      <Skeleton className="inline-block h-lh w-48 max-w-full align-top rounded-md" />
      <span className="bg-soft-pink-100 absolute inset-s-0 top-6 -z-10 h-4 w-38.5 rounded-e-full dark:bg-zinc-700" />
      <span className="bg-soft-pink-600 dark:bg-soft-pink-500 absolute inset-s-0 top-10 -z-10 h-0.5 w-15" />
    </div>
  );
}

export function CategoriesSearchSkeleton() {
  return <Skeleton className="h-input w-full max-w-md shrink-0 rounded-lg" aria-hidden="true" />;
}

function CategoriesPaginationSkeleton() {
  return (
    <div className="flex w-full justify-center pt-2" aria-hidden="true">
      <div className="flex items-center gap-0.5">
        <Skeleton className="size-8 rounded-md" />
        <Skeleton className="h-input w-28 rounded-md" />
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="size-8 rounded-md" />
        ))}
        <Skeleton className="h-input w-20 rounded-md" />
        <Skeleton className="size-8 rounded-md" />
      </div>
    </div>
  );
}

export function CategoriesGridSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6" aria-hidden="true">
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: CATEGORIES_OPTIONS.DESKTOP_LIMIT }, (_, index) => (
          <CategoryCardSkeleton key={index} className="w-full min-w-0" />
        ))}
      </div>
      <CategoriesPaginationSkeleton />
    </div>
  );
}

export default function CategoriesPageSkeleton() {
  return (
    <main className="container flex flex-col gap-10 overflow-hidden py-6 sm:py-8">
      <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <CategoriesHeadingSkeleton />
        <CategoriesSearchSkeleton />
      </div>
      <CategoriesGridSkeleton />
    </main>
  );
}
