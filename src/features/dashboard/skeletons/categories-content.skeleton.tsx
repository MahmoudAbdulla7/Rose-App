import { CATEGORIES_OPTIONS } from '@/shared/lib/apis/categories/categories.options';
import Skeleton from '@/shared/ui/skeleton';

export default function CategoriesContentSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6" aria-hidden="true">
      <section className="bg-ds-plain flex w-full flex-col gap-4.5 rounded-4xl p-6">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-11 rounded-lg max-sm:w-11 sm:w-52" />
        </div>

        <Skeleton className="h-input w-full rounded-lg" />

        <div className="border-ds-border-muted flex w-full flex-col overflow-hidden rounded-lg border">
          <Skeleton className="h-10 rounded-none" />
          {Array.from({ length: CATEGORIES_OPTIONS.DESKTOP_LIMIT }, (_, index) => (
            <div
              key={index}
              className="border-ds-border-muted flex h-15 items-center border-t px-5"
            >
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          ))}
        </div>
      </section>

      <Skeleton className="h-input w-80 max-w-full rounded-lg" />
    </div>
  );
}
