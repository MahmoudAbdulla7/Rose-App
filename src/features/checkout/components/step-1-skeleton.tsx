import Skeleton from '@/shared/ui/skeleton';

export default function Step1Skeleton() {
  return (
    <div className="flex w-full flex-col gap-3">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-1.5 rounded-xl border border-zinc-300 px-4 py-3.5"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-[33px] rounded-full" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
          <Skeleton className="h-7 w-3/5 rounded-full" />
        </div>
      ))}
    </div>
  );
}
