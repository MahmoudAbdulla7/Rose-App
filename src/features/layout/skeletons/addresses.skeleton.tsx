import Skeleton from '@/shared/ui/skeleton';

interface AddressesSkeletonProps {
  count?: number;
}

export default function AddressesSkeleton({ count = 1 }: AddressesSkeletonProps) {
  const items = Array.from({ length: count });

  return (
    <div className="flex flex-col gap-6">
      {items.map((_, index) => (
        <div
          key={index}
          className="relative mt-5 flex flex-col gap-2 rounded-lg border p-4 pe-8 pt-6"
        >
          {/* Title */}
          <Skeleton className="absolute inset-s-3 -top-5 h-8 w-20 px-1.5" />
          <div className="flex justify-between">
            {/* City */}
            <Skeleton className="h-8 w-40 px-1.5" />
            {/* Phone */}
            <Skeleton className="h-8 w-40 px-1.5" />
          </div>
          {/* Street */}
          <Skeleton className="h-8 w-80 px-1.5" />
        </div>
      ))}
    </div>
  );
}
