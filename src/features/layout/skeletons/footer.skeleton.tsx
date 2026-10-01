import Skeleton from '@/shared/ui/skeleton';

export default function FooterSkeleton() {
  return (
    <footer className="bg-zinc-800 py-10 dark:bg-zinc-900" aria-hidden="true">
      <div className="container grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-[2fr_4fr_3fr]">
        <div className="flex flex-col items-center justify-center gap-1.5">
          <Skeleton className="h-24 w-40 rounded-md" />
          <Skeleton className="h-5 w-28 rounded-md" />
          <Skeleton className="h-4 w-36 rounded-md" />
        </div>
        <div className="flex flex-col items-start gap-2 md:ps-4">
          <Skeleton className="h-5 w-24 rounded-md" />
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-4 w-28 rounded-md" />
          ))}
        </div>
        <div className="flex w-full flex-col gap-5 md:col-span-2 lg:col-span-1">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-4 w-full max-w-sm rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </footer>
  );
}
