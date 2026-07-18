'use client';

import { Link } from '@/i18n/navigation';
import { useAuth } from '@/shared/lib/hooks/use-auth.hook';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HeaderAuth() {
  const t = useTranslations('header');
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="bg-ds-muted h-8 w-24 animate-pulse rounded-lg" />;
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2 px-2">
        <span className="text-ds-text-default hidden max-w-28 truncate text-sm sm:inline">
          {user.username ?? ''}
        </span>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="text-ds-text-default flex items-center gap-1.5 px-2 py-1.5 text-sm"
    >
      <User className="size-4" />
      <span className="hidden sm:inline">{t('login')}</span>
    </Link>
  );
}
