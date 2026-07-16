import { OCCASIONS_OPTIONS } from '@/shared/lib/apis/occasions/occasions.options';
import Skeleton from '@/shared/ui/skeleton';

export default function PopularProductsOccasionsSkeleton() {
  return (
    <div className="flex flex-row gap-2.5">
      {Array.from({ length: OCCASIONS_OPTIONS.LANDING_PAGE_LIMIT }, (_, index) => (
        <Skeleton key={index} className="h-4 w-16 rounded-2xl" />
      ))}
    </div>
  );
}
