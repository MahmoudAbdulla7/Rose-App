import ComingSoonPage from '@/features/landing-page/components/coming-soon-page';
import ComingSoonPageSkeleton from '@/features/landing-page/skeletons/coming-soon/coming-soon-page.skeleton';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function AboutPage({ params }: Props) {
  return (
    <Suspense fallback={<ComingSoonPageSkeleton />}>
      <ComingSoonPage params={params} titleKey="about" />
    </Suspense>
  );
}
