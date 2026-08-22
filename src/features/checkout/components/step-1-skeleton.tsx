import Skeleton from '@/shared/ui/skeleton';

export default function Step1Skeleton() {
  return (
    <div className="mt-4 space-y-3">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="rounded-3xl border px-4 py-3.5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-9 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="mt-2 h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
