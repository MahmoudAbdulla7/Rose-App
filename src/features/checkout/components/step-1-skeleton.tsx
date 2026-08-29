import Skeleton from '@/shared/ui/skeleton';

export default function Step1Skeleton() {
  return (
    <div className="mt-3 space-y-2.5 lg:mt-4 lg:space-y-3">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="rounded-2xl border px-3 py-3 lg:rounded-3xl lg:px-4 lg:py-3.5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24 lg:h-6 lg:w-32" />
            <div className="flex items-center gap-2 lg:gap-2.5">
              <Skeleton className="size-7 rounded-full lg:size-9" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="mt-2 h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
