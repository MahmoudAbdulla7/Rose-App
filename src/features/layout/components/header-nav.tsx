'use client';

import {
  HEADER_NAV_LINKS,
  isHeaderNavLinkActive,
} from '@/features/landing-page/lib/constants/header-nav-links';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';

export default function HeaderNav() {
  // Translation
  const t = useTranslations('header.nav');

  // Navigation
  const pathname = usePathname();

  return (
    <nav
      aria-label={t('label')}
      className="text-ds-text-inverse no-scrollbar flex items-center gap-1 overflow-x-auto md:justify-center md:gap-2"
    >
      {HEADER_NAV_LINKS.map((link) => {
        const Icon = link.icon;
        const isActive = isHeaderNavLinkActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            prefetch={link.prefetch}
            className={cn(
              'inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap',
              isActive ? 'border-ds-text-inverse' : 'border-transparent',
            )}
          >
            <Icon className="size-4" />
            {t(link.label)}
          </Link>
        );
      })}
    </nav>
  );
}
