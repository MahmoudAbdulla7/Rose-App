'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

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

  return (
    <LoginDialogContext.Provider value={{ openLoginDialog, closeLoginDialog }}>
      {children}
      <LoginDialog open={open} onOpenChange={setOpen} />
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
