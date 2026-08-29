import { OCCASIONS_OPTIONS } from '@/shared/lib/apis/occasions/occasions.options';
import Skeleton from '@/shared/ui/skeleton';

export default function HeroSkeleton() {
  return (
    <div className="space-y-6.25" aria-hidden="true">
      <div className="grid grid-cols-1 gap-4 md:gap-6.25 lg:grid-cols-[minmax(0,25%)_minmax(0,1fr)] lg:items-stretch">
        <Skeleton className="order-2 aspect-4/3 w-full rounded-4xl sm:aspect-3/4 lg:order-1 lg:aspect-auto lg:min-h-100" />
        <Skeleton className="order-1 aspect-4/3 w-full rounded-4xl sm:aspect-video lg:order-2 lg:aspect-auto lg:min-h-100" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {Array.from({ length: OCCASIONS_OPTIONS.HERO_LIMIT }, (_, index) => (
          <Skeleton
            key={index}
            className="aspect-4/3 size-full rounded-4xl sm:aspect-1.5/1"
          />
        ))}
      </div>
    </div>
  );
}
