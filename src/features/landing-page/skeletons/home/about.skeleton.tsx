import { ABOUT_FEATURES } from '@/features/landing-page/lib/constants/home/about.constant';
import Skeleton from '@/shared/ui/skeleton';

export default function AboutSkeleton() {
  return (
    <section className="w-full" aria-hidden="true">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[.9fr_1.1fr] xl:gap-20">
        <div className="grid grid-cols-[1.2fr_.8fr] items-stretch gap-2 max-lg:order-last">
          <div className="relative flex h-full items-start justify-end">
            <Skeleton className="aspect-302/344 w-[97%] rounded-bl-8xl rounded-br-8xl rounded-tl-6xl rounded-tr-8xl" />
          </div>

          <div className="flex h-full flex-col gap-2">
            <Skeleton className="aspect-square w-full shrink-0 rounded-full" />
            <Skeleton className="min-h-0 flex-1 rounded-bl-6xl rounded-br-7xl rounded-tl-6xl rounded-tr-7xl" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-9 w-full max-w-151 rounded-md" />
            <Skeleton className="h-4 w-full max-w-md rounded-md" />
            <Skeleton className="h-4 w-3/4 max-w-sm rounded-md" />
          </div>

          <Skeleton className="h-9 w-30.25 rounded-xl" />

          <ul className="grid w-full grid-cols-1 gap-x-6 sm:grid-cols-2">
            {ABOUT_FEATURES.map((feature) => (
              <li key={feature.id} className="flex items-center gap-2">
                <Skeleton className="size-10.5 shrink-0 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
