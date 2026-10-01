import { cn } from '@/shared/lib/utils';
import Skeleton from '@/shared/ui/skeleton';

export interface ICategoryCardSkeletonProps {
  className?: string;
}

export default function CategoryCardSkeleton({ className }: ICategoryCardSkeletonProps) {
  return (
    <article
      className={cn('group flex w-full min-w-0 flex-col gap-4 rounded-4xl', className)}
      aria-hidden="true"
    >
      {/* Mirrors HoveredLink: flex w-full flex-col gap-4 */}
      <div className="flex w-full flex-col gap-4">
        {/* Image — relative aspect-4/3 w-full overflow-hidden rounded-2xl */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
          <Skeleton className="absolute inset-0 size-full rounded-2xl" />
        </div>

        {/* Content — flex w-full flex-col gap-2 */}
        <div className="flex w-full flex-col gap-2">
          {/* title: text-lg leading-none font-semibold */}
          <div className="truncate text-lg leading-none font-semibold">
            <Skeleton className="inline-block h-lh w-3/4 max-w-full align-top rounded-md" />
          </div>

          {/* description: line-clamp-2 text-sm leading-relaxed */}
          <div className="line-clamp-2 text-sm leading-relaxed">
            <Skeleton className="block h-[2lh] w-full rounded-md" />
          </div>

          {/* productCount: text-sm font-medium */}
          <div className="text-sm font-medium">
            <Skeleton className="inline-block h-lh w-24 max-w-full align-top rounded-md" />
          </div>
        </div>
      </div>
    </article>
  );
}
