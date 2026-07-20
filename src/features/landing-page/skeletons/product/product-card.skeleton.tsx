import { cn } from '@/shared/lib/utils';
import Skeleton from '@/shared/ui/skeleton';

export interface IProductCardSkeletonProps {
  className?: string;
}

export default function ProductCardSkeleton({ className }: IProductCardSkeletonProps) {
  return (
    <article className={cn('flex w-full flex-col gap-4 rounded-4xl', className)}>
      {/* Image */}
      <div className="relative h-72 w-full overflow-hidden rounded-2xl">
        <Skeleton className="h-full w-full object-cover" />

        {/* Actions and badges */}
        <div className="absolute inset-0 z-10 flex items-start justify-between p-2.5">
          <Skeleton className="inline-flex h-7.5 w-7.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />

          <Skeleton className="h-4 w-20 bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>

      {/* Content */}
      <div className="flex w-full flex-col gap-3">
        {/* Name */}
        <Skeleton className="h-4.5 w-3/4 bg-zinc-300 dark:bg-zinc-700" />

        {/* Price and cart button */}
        <div className="flex items-center gap-2.5">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {/* Rating */}
            <Skeleton className="h-4 w-20" />

            {/* Price */}
            <Skeleton className="h-4 w-65" />
          </div>

          {/* Cart button */}
          <Skeleton className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>
    </article>
  );
}
