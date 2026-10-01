import Skeleton from '@/shared/ui/skeleton';

const FEATURE_COUNT = 4;

export default function FeaturesSkeleton() {
  return (
    <section aria-hidden="true">
      <div className="bg-ds-subtle grid grid-cols-2 gap-8 rounded-4xl p-4 md:p-8 lg:grid-cols-4 lg:p-10">
        {Array.from({ length: FEATURE_COUNT }, (_, index) => (
          <div key={index} className="flex items-center justify-center gap-2">
            <Skeleton className="size-16 shrink-0 rounded-full" />
            <div className="flex min-w-0 flex-col gap-2">
              <Skeleton className="h-6 w-28 rounded-md" />
              <Skeleton className="h-4 w-36 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
