import Skeleton from '@/shared/ui/skeleton';
import { Separator } from '@/shared/ui/separator';

const THUMBNAIL_COUNT = 6;
const REVIEW_ITEM_COUNT = 2;

export default function ProductDetailsSkeleton() {
  return (
    <div className="container space-y-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-17.5">
        <div className="flex flex-col gap-2.5 max-lg:order-last">
          <Skeleton className="aspect-605/402 w-full rounded-2xl" />

          <ul className="grid grid-cols-4 gap-2.5 lg:grid-cols-6">
            {Array.from({ length: THUMBNAIL_COUNT }, (_, index) => (
              <li key={index}>
                <Skeleton className="aspect-91/111 w-full rounded-lg" />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 lg:h-130.75">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-9 w-full max-w-lg rounded-md" />

            <div className="flex flex-wrap items-center gap-3.5">
              <Skeleton className="h-9 w-36 rounded-md" />
              <Skeleton className="h-8 w-32 rounded-4xl" />
            </div>
          </div>

          <Separator className="bg-zinc-100 dark:bg-zinc-700" />

          <div className="flex items-center gap-1.5">
            <Skeleton className="size-5 shrink-0 rounded-full" />
            <Skeleton className="h-5 w-44 rounded-md" />
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>

          <Separator className="bg-zinc-100 dark:bg-zinc-700" />

          <div className="flex flex-col gap-2 lg:min-h-0 lg:flex-1">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
            <Skeleton className="hidden h-4 w-3/5 rounded-md lg:block" />
          </div>

          <div className="flex items-stretch gap-2.5">
            <Skeleton className="size-11.5 shrink-0 rounded-xl" />
            <Skeleton className="h-11.5 flex-1 rounded-xl" />
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <Skeleton className="h-9 w-48 rounded-md" />

        <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
          <div className="max-h-91.75 min-w-0 flex-1 overflow-hidden px-1.75 py-2">
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: REVIEW_ITEM_COUNT }, (_, index) => (
                <article
                  key={index}
                  className="border-ds-border-muted flex flex-col gap-2.5 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-2.5 px-0.75">
                    <Skeleton className="size-11.25 shrink-0 rounded-full" />
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <Skeleton className="h-4 w-32 rounded-md" />
                      <Skeleton className="h-3.5 w-24 rounded-md" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-4 w-10 rounded-md" />
                  </div>

                  <div className="flex flex-col gap-1.5 pt-1">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="hidden bg-zinc-200 lg:block dark:bg-zinc-700"
          />

          <div className="flex w-full flex-col justify-between gap-4 lg:w-[484px] lg:shrink-0">
            <Skeleton className="h-6 w-40 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-[10px]" />
            <Skeleton className="h-12 w-full rounded-[10px]" />
          </div>
        </div>

        <Separator className="bg-zinc-200 dark:bg-zinc-700" />

        <section className="flex flex-col gap-2.5">
          <Skeleton className="h-6 w-40 rounded-md" />

          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
              <Skeleton className="h-8 w-12 rounded-md" />
              <Skeleton className="h-5 w-28 rounded-md" />
            </div>
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </section>
      </section>
    </div>
  );
}
