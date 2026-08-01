'use client';

import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { useAuth } from '@/shared/hooks';

export function ReviewAuthGuard({ children }: { children: React.ReactNode }) {
  // Translation
  const t = useTranslations('review.form');

  // Navigation
  const pathname = usePathname();

  // Custom hooks
  const { isAuthenticated, isLoading } = useAuth();

  // Variables
  const showLoginOverlay = !isAuthenticated || isLoading;

  const callbackUrl =
    typeof window !== 'undefined' ? `${pathname}${window.location.search}` : pathname;

  return (
    <div className="relative overflow-hidden">
      {/* Layer */}
      <div
        inert={showLoginOverlay}
        className={cn('transition-[filter,opacity] duration-200', showLoginOverlay && 'blur-[2px]')}
      >
        {children}
      </div>

      {/* Login overlay */}
      {!isAuthenticated && !isLoading && (
        <Link
          href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="focus-visible:ring-ds-primary absolute inset-0 z-10 flex items-center justify-center p-6 text-center font-semibold outline-none focus-visible:ring-2 focus-visible:ring-inset"
          aria-label={t('loginRequired')}
        >
          {t('loginRequired')}
        </Link>
      )}
    </div>
  );
}
