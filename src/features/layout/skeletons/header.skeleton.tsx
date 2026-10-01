import Skeleton from '@/shared/ui/skeleton';

export default function HeaderSkeleton() {
  return (
    <header className="font-primary sticky top-0 z-50" aria-hidden="true">
      <div className="border-ds-border-muted bg-ds-plain border-b">
        <div className="max-w-8xl mx-auto flex items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
          <Skeleton className="h-10 w-28 shrink-0 rounded-md sm:h-14 sm:w-36 md:h-16 md:w-40" />
          <Skeleton className="hidden h-10 min-w-0 flex-1 rounded-md md:block md:max-w-xl lg:max-w-2xl" />
          <div className="ms-auto flex shrink-0 items-center gap-2">
            <Skeleton className="size-8 rounded-md" />
            <Skeleton className="size-8 rounded-md" />
            <Skeleton className="size-8 rounded-md" />
          </div>
        </div>
      </div>
      <div className="bg-ds-primary hidden h-10 md:block" />
    </header>
  );
}
