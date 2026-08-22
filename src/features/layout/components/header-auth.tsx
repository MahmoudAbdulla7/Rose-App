'use client';

import { Link } from '@/i18n/navigation';
import { useAuth } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import UserDropdown from './user-dropdown';

type HeaderAuthProps = {
  className?: string;
  /** Show username / login label even on the smallest screens */
  alwaysShowLabel?: boolean;
};

export default function HeaderAuth({ className, alwaysShowLabel = false }: HeaderAuthProps) {
  const t = useTranslations('header');
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="bg-ds-muted h-8 w-24 animate-pulse rounded-lg" />;
  }

  if (isAuthenticated && user) {
    return <UserDropdown />;
  }

  return (
    <Link
      href="/login"
      className={cn(
        'text-ds-text-default flex items-center gap-1.5 px-2 py-1.5 text-sm',
        className,
      )}
    >
      <User className="size-4" />
      <span className={cn(!alwaysShowLabel && 'hidden sm:inline')}>{t('login')}</span>
    </Link>
  );
}
