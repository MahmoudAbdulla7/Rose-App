import type { ReactNode } from 'react';

import { LoginDialogProvider } from '@/features/auth/providers/login-dialog.provider';
import Footer from '@/features/layout/components/footer';
import Header from '@/features/layout/components/header';

type Props = {
  children: ReactNode;
};

export default function LandingPageLayout({ children }: Props) {
  return (
    <main className="flex-1">
      <LoginDialogProvider>
        <Header />
        {children}
        <Footer />
      </LoginDialogProvider>
    </main>
  );
}
