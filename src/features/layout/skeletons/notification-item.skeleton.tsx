import Skeleton from '@/shared/ui/skeleton';

interface NotificationItemSkeletonProps {
  count?: number;
}

export default function NotificationItemSkeleton({ count = 1 }: NotificationItemSkeletonProps) {
  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, index) => (
        <div key={index} className="flex min-h-30.5 flex-col gap-1.5 p-4">
          {/* Title */}
          <Skeleton className="bg-ds-soft h-5 w-3/4" />

          {/* Message */}
          <Skeleton className="bg-ds-soft h-14 w-full" />
        </div>
      ))}
    </>
  );
}
