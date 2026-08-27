import Skeleton from '@/shared/ui/skeleton';

export default function WishlistItemCardSkeleton() {
  return (
    <article
      className="grid min-h-45 grid-cols-[7.25rem_minmax(0,1fr)] gap-4 p-4 first:rounded-t-lg last:rounded-b-lg sm:grid-cols-[7.25rem_minmax(0,1fr)_minmax(12rem,14rem)] sm:gap-5 lg:grid-cols-[7.25rem_minmax(0,1fr)_minmax(16rem,22rem)]"
      aria-hidden="true"
    >
      <Skeleton className="size-29 shrink-0 rounded-md" />

      <div className="flex min-w-0 items-stretch gap-3 sm:contents">
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 py-0.5">
          <div className="flex min-w-0 flex-col gap-1.5">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-6 w-3/4 max-w-72 rounded-md" />
            <div className="flex flex-wrap items-center gap-1.5">
              <Skeleton className="h-6 w-14 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>

          <div className="flex flex-wrap items-baseline gap-2">
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-between gap-3 sm:gap-5">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="size-11 rounded-lg sm:h-11 sm:w-40" />
        </div>
      </div>
    </article>
  );
}
