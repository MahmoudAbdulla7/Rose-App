import Skeleton from '@/shared/ui/skeleton';

type CartSkeletonProps = {
  rows?: number;
};

export default function CartSkeleton({ rows = 3 }: CartSkeletonProps) {
  return (
    <div
      className="border-ds-border-muted divide-ds-border-muted divide-y rounded-2xl border"
      aria-hidden="true"
    >
      {Array.from({ length: rows }, (_, index) => (
        <article
          key={index}
          className="grid min-w-0 grid-cols-[5rem_minmax(0,1fr)] grid-rows-[auto_auto_auto_auto] gap-x-3 gap-y-2.5 p-3 min-[400px]:grid-cols-[5.75rem_minmax(0,1fr)] min-[400px]:gap-x-4 min-[480px]:gap-y-3 min-[480px]:p-4 md:min-h-45 md:grid-cols-[7.25rem_minmax(0,1fr)_minmax(11rem,14rem)] md:grid-rows-[auto_auto_auto] md:gap-5 lg:grid-cols-[7.25rem_minmax(0,1fr)_minmax(16rem,22rem)]"
        >
          <Skeleton className="row-span-3 size-20 min-[400px]:size-23 min-[480px]:size-26 md:row-span-3 md:size-29" />

          <div className="flex min-w-0 items-start justify-between gap-2 md:col-start-2 md:row-start-1">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <Skeleton className="h-5 w-16 rounded-full md:hidden" />
              <Skeleton className="h-5 w-full max-w-64 rounded-md min-[480px]:h-6" />
            </div>
            <Skeleton className="size-10 shrink-0 rounded-lg md:hidden" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 md:col-start-2 md:row-start-2">
            <Skeleton className="h-6 w-14 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>

          <div className="flex min-w-0 flex-col gap-1 md:col-start-2 md:row-start-3">
            <Skeleton className="h-7 w-28 rounded-md min-[480px]:h-8" />
            <Skeleton className="h-4 w-36 rounded-md md:hidden" />
          </div>

          <div className="col-span-2 flex items-center justify-between gap-3 md:hidden">
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-8 w-45 max-w-52 rounded-lg" />
          </div>

          <div className="hidden md:col-start-3 md:row-span-3 md:flex md:flex-col md:items-end md:justify-between md:gap-5">
            <Skeleton className="h-11 w-28 rounded-lg" />
            <Skeleton className="h-9 w-45 rounded-lg" />
          </div>
        </article>
      ))}
    </div>
  );
}
