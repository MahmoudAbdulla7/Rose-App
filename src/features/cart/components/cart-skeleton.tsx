import Skeleton from '@/shared/ui/skeleton';

type CartSkeletonProps = {
  rows?: number;
};

export default function CartSkeleton({ rows = 3 }: CartSkeletonProps) {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="border-ds-border-muted flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
        >
          <Skeleton className="size-28 shrink-0 rounded-xl sm:size-32" />

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <Skeleton className="h-5 w-56 max-w-full rounded-md" />
            <Skeleton className="h-4 w-40 max-w-full rounded-md" />
            <Skeleton className="h-5 w-28 rounded-md" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
