import ComingSoonPage from '@/features/landing-page/components/coming-soon-page';
import ComingSoonPageSkeleton from '@/features/landing-page/skeletons/coming-soon/coming-soon-page.skeleton';
import { Suspense } from 'react';

export const instant = false;

type Props = {
  params: Promise<{ locale: string }>;
};

export default function OrdersPage({ params }: Props) {
  return (
    <Suspense fallback={<ComingSoonPageSkeleton />}>
      <ComingSoonPage params={params} titleKey="orders" />
    </Suspense>
  );
}
