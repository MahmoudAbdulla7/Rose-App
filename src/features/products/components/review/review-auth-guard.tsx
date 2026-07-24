'use client';

import { useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useAuth } from '@/shared/hooks';

export function ReviewAuthGuard({ children }: { children: React.ReactNode }) {
  // Translation
  const t = useTranslations('review.form');

  // Navigation
  const router = useRouter();

  // Custom hooks
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // Variables
  const isLocked = !isAuthenticated || isLoading;

  // Functions
  const handleLogin = () => {
    const currentUrl = `${pathname}${window.location.search}`;
    router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Layer */}
      <div
        aria-disabled={isLocked}
        className="transition-[filter,opacity] duration-200"
        style={isLocked ? { filter: 'blur(2px)' } : undefined}
      >
        {children}
      </div>

      {/* Button */}
      {!isAuthenticated && !isLoading && (
        <button
          type="button"
          onClick={handleLogin}
          className="focus-visible:ring-ds-primary absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-2 p-6 text-center outline-none focus-visible:ring-2 focus-visible:ring-inset"
          aria-label={t('loginRequired')}
        >
          <span className="font-semibold">{t('loginRequired')}</span>
        </button>
      )}
    </div>
  );
}
