'use client';

import LoginHoverPopup from '@/features/auth/components/login-hover-popup';
import { useAuth } from '@/shared/hooks';
import UserDropdown from './user-dropdown';

type HeaderAuthProps = {
  className?: string;
  /** Show username / login label even on the smallest screens */
  alwaysShowLabel?: boolean;
};

export default function HeaderAuth({ className, alwaysShowLabel = false }: HeaderAuthProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="bg-ds-muted h-8 w-24 animate-pulse rounded-lg" />;
  }

  if (isAuthenticated && user) {
    return <UserDropdown />;
  }

  return <LoginHoverPopup className={className} alwaysShowLabel={alwaysShowLabel} />;
}