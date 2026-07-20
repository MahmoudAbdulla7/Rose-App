import type { ReactNode } from 'react';

import { LoginDialogProvider } from '@/features/auth/providers/login-dialog.provider';

type Props = {
  children: ReactNode;
};

export default function LandingPageLayout({ children }: Props) {
  return <LoginDialogProvider>{children}</LoginDialogProvider>;
}
