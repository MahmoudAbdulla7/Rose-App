import type { ReactNode } from 'react';
import { Suspense } from 'react';

import { LoginDialogProvider } from '@/features/auth/providers/login-dialog.provider';
import Footer from '@/features/layout/components/footer';
import Header from '@/features/layout/components/header';
import FooterSkeleton from '@/features/layout/skeletons/footer.skeleton';
import HeaderSkeleton from '@/features/layout/skeletons/header.skeleton';

type Props = {
  children: ReactNode;
};

export default function LandingPageLayout({ children }: Props) {
  return (
    <main className="flex-1">
      <LoginDialogProvider>
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
        {children}
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
      </LoginDialogProvider>
    </main>
  );
}
