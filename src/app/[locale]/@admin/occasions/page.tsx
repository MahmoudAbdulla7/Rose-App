import { Suspense } from 'react';

import OccasionsContent from '@/features/dashboard/components/occasions/occasions-content';
import OccasionsContentSkeleton from '@/features/dashboard/skeletons/occasions-content.skeleton';
import LoadErrorBoundary from '@/shared/components/load-error-boundary';

type Props = {
  searchParams: Promise<ISearchParams>;
};

export default function DashboardOccasionsPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<OccasionsContentSkeleton />}>
      <LoadErrorBoundary entity="occasions">
        <OccasionsContent searchParams={searchParams} />
      </LoadErrorBoundary>
    </Suspense>
  );
}
