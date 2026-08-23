import { cn } from '@/shared/lib/utils';
import Skeleton from '@/shared/ui/skeleton';

export default function CheckoutResultSkeleton() {
  return (
    <section className="container my-8 px-4 md:my-16" aria-hidden="true">
      <div
        className={cn(
          'relative isolate flex min-h-[min(32rem,calc(100dvh-12rem))] w-full flex-col items-center justify-center overflow-hidden rounded-3xl px-6 py-16',
          'border-ds-border-soft border',
          'bg-ds-subtle',
        )}
      >
        <Skeleton className="mb-8 size-20 rounded-full" />
        <div className="flex w-full max-w-lg flex-col items-center gap-3">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-10 w-64 max-w-full rounded-md" />
          <Skeleton className="h-6 w-full max-w-md rounded-md" />
          <Skeleton className="h-6 w-3/4 max-w-sm rounded-md" />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Skeleton className="h-12 w-40 rounded-2xl" />
          <Skeleton className="h-12 w-36 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
