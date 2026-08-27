import Skeleton from '@/shared/ui/skeleton';

export default function AuthFormSkeleton() {
  return (
    <div className="flex w-full flex-col gap-5" aria-hidden="true">
      <div className="border-ds-border-soft mx-auto mb-6 w-full border-b pb-4">
        <Skeleton className="mx-auto h-12 w-48 rounded-md" />
      </div>
      <Skeleton className="h-12 w-full rounded-md" />
      <Skeleton className="h-12 w-full rounded-md" />
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="mx-auto h-4 w-40 rounded-md" />
    </div>
  );
}
