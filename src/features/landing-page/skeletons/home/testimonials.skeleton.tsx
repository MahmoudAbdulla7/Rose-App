import Skeleton from '@/shared/ui/skeleton';

const TESTIMONIAL_CARD_COUNT = 3;

export default function TestimonialsSkeleton() {
  return (
    <section className="w-full" aria-hidden="true">
      <div className="container">
        <Skeleton className="h-9 w-56 rounded-md" />
      </div>

      <div className="bg-ds-primary-fade mt-10 w-full">
        <div className="container flex gap-6 overflow-hidden pt-15 pb-10">
          {Array.from({ length: TESTIMONIAL_CARD_COUNT }, (_, index) => (
            <div
              key={index}
              className="relative flex w-full shrink-0 flex-col basis-full sm:basis-3/4 md:basis-1/2 xl:basis-1/3"
            >
              <Skeleton className="absolute -top-15 left-1/2 z-10 size-30 -translate-x-1/2 rounded-full border-4 border-white" />
              <div className="rounded-5xl flex w-full flex-col items-center bg-white px-5 pt-16 pb-5">
                <Skeleton className="mb-9 h-4 w-28 rounded-md" />
                <Skeleton className="mb-2.5 h-4 w-24 rounded-md" />
                <Skeleton className="mb-2 h-4 w-full rounded-md" />
                <Skeleton className="mb-2 h-4 w-full rounded-md" />
                <Skeleton className="mb-9 h-4 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
