'use client';

import { Flower } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  DASHBOARD_NAV_LINKS,
  isDashboardNavLinkActive,
} from '@/features/dashboard/lib/constants/dashboard-nav-links';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';

export default function DashboardBottomNav() {
  // Translation
  const t = useTranslations('dashboard');

  // Navigation
  const pathname = usePathname();

  return (
    <nav
      aria-label={t('nav.label')}
      className="border-ds-border-muted bg-ds-plain fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t lg:hidden"
    >
      {/* Preview website */}
      <Link
        href="/"
        aria-label={t('previewWebsite')}
        className="bg-ds-primary text-ds-text-inverse shadow-ds-soft absolute start-1/2 -top-6 flex size-12 -translate-x-1/2 items-center justify-center rounded-full rtl:translate-x-1/2"
      >
        <Flower className="size-6" />
      </Link>

      {DASHBOARD_NAV_LINKS.map((link) => {
        const Icon = link.icon;
        const isActive = isDashboardNavLinkActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex flex-col items-center gap-1 py-2 text-xs font-semibold',
              isActive ? 'text-ds-primary' : 'text-ds-text-plain',
            )}
          >
            <Icon className="size-5" />
            {t(`nav.${link.label}`)}
          </Link>
        );
      })}
    </nav>
  );
}
