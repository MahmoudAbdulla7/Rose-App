'use client';

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import LoginDialog from '@/features/auth/components/login-dialog';

type LoginDialogContextValue = {
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
};

const LoginDialogContext = createContext<LoginDialogContextValue | null>(null);

export function LoginDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openLoginDialog = useCallback(() => setOpen(true), []);
  const closeLoginDialog = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openLoginDialog, closeLoginDialog }),
    [openLoginDialog, closeLoginDialog],
  );

  return (
    <LoginDialogContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        <LoginDialog open={open} onOpenChange={setOpen} />
      </Suspense>
    </LoginDialogContext.Provider>
  );
}

export function useLoginDialog() {
  const context = useContext(LoginDialogContext);

  if (!context) {
    throw new Error('useLoginDialog must be used within a LoginDialogProvider');
  }

  return context;
}
