import WishlistItemCardSkeleton from '@/features/landing-page/skeletons/wishlist/wishlist-item-card.skeleton';
import Skeleton from '@/shared/ui/skeleton';

type WishlistItemsSkeletonProps = {
  rows?: number;
};

export function WishlistItemsSkeleton({ rows = 3 }: WishlistItemsSkeletonProps) {
  return (
    <section className="flex flex-col gap-5" aria-hidden="true">
      <div className="border-ds-border-subtle divide-ds-border-subtle bg-ds-plain divide-y rounded-lg border">
        {Array.from({ length: rows }, (_, index) => (
          <WishlistItemCardSkeleton key={index} />
        ))}
      </div>

      <div className="flex justify-start">
        <Skeleton className="h-12 min-w-58 rounded-lg" />
      </div>
    </section>
  );
}

function WishlistHeaderSkeleton() {
  return (
    <header className="border-ds-border-subtle flex flex-wrap items-center justify-between gap-4 border-b pb-5">
      <div className="flex min-w-0 items-end gap-3">
        <Skeleton className="mb-1 size-12 shrink-0 rounded-md sm:size-14" />
        <div className="flex min-w-0 flex-wrap items-end gap-x-3 gap-y-1">
          <Skeleton className="h-10.5 w-48 max-w-full rounded-md sm:h-12 sm:w-56" />
          <Skeleton className="mb-1.5 h-4 w-16 rounded-md" />
        </div>
      </div>

      <Skeleton className="h-11 min-w-45 rounded-lg" />
    </header>
  );
}

export default function WishlistPageSkeleton() {
  return (
    <main className="container flex min-h-[calc(100dvh-12rem)] flex-col gap-6 pt-14 pb-10">
      <WishlistHeaderSkeleton />
      <WishlistItemsSkeleton />
    </main>
  );
}
