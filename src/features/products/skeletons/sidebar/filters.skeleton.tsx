import { CATEGORIES_OPTIONS } from '@/shared/lib/apis/categories/categories.options';
import { OCCASIONS_OPTIONS } from '@/shared/lib/apis/occasions/occasions.options';
import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import Skeleton from '@/shared/ui/skeleton';

function FilterSectionSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 border-b border-zinc-100 py-2.5 pb-5 dark:border-zinc-800">
      <Skeleton className="h-5 w-24 rounded-md" />
      {children}
    </div>
  );
}

export default function FiltersSkeleton() {
  return (
    <>
      <div className="lg:hidden" aria-hidden="true">
        <Skeleton className="h-10.25 w-full rounded-xl" />
      </div>

      <div
        className="hidden flex-col border-e border-zinc-100 pe-6 lg:flex dark:border-zinc-800"
        aria-hidden="true"
      >
        <FilterSectionSkeleton>
          <div className="flex h-49.75 max-h-49.75 min-h-0 flex-col gap-1 overflow-hidden">
            {Array.from({ length: Number(CATEGORIES_OPTIONS.FILTERS_LIMIT) }, (_, index) => (
              <Skeleton key={index} className="h-9 w-full shrink-0 rounded-sm" />
            ))}
          </div>
        </FilterSectionSkeleton>

        <FilterSectionSkeleton>
          <div className="grid h-60.5 max-h-60.5 min-h-0 grid-cols-2 content-start gap-2.5 overflow-hidden">
            {Array.from({ length: Number(OCCASIONS_OPTIONS.FILTERS_LIMIT) }, (_, index) => (
              <Skeleton key={index} className="h-18.5 rounded-lg" />
            ))}
          </div>
        </FilterSectionSkeleton>

        <FilterSectionSkeleton>
          <div className="flex items-center gap-2">
            {Array.from({ length: PRODUCTS_OPTIONS.MAX_RATING }, (_, index) => (
              <Skeleton key={index} className="size-6.25 rounded-sm" />
            ))}
          </div>
        </FilterSectionSkeleton>

        <FilterSectionSkeleton>
          <div className="flex items-start gap-2">
            <Skeleton className="h-22.5 flex-1 rounded-xl" />
            <Skeleton className="h-22.5 flex-1 rounded-xl" />
          </div>
        </FilterSectionSkeleton>

        <div className="flex flex-col gap-2.5 py-4">
          <Skeleton className="h-10.25 w-full rounded-xl" />
        </div>
      </div>
    </>
  );
}
