import Skeleton from '@/shared/ui/skeleton';

export default function NotificationItemSkeleton() {
  return (
    <div className="flex min-h-30.5 flex-col gap-1.5 p-4">
      {/* Title */}
      <Skeleton className="bg-ds-soft h-5 w-3/4" />

      {/* Message */}
      <Skeleton className="bg-ds-soft h-14 w-full" />
    </div>
  );
}
