'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import DashboardUserMenu from './dashboard-user-menu';
import { DASHBOARD_NAV_LINKS } from '@/features/dashboard/lib/constants/dashboard-nav-links';
import { Link, usePathname } from '@/i18n/navigation';
import ThemeToggle from '@/shared/components/theme-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

function formatSegmentLabel(segment: string) {
  return segment
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function DashboardHeader() {
  // Translation
  const t = useTranslations('dashboard');

  // Navigation
  const pathname = usePathname();

  // Variables
  const isProfile = pathname === '/profile' || pathname.startsWith('/profile/');
  const section = DASHBOARD_NAV_LINKS.find(
    (link) => link.href !== '/' && (pathname === link.href || pathname.startsWith(`${link.href}/`)),
  );

  const nestedSegments = section
    ? pathname
        .slice(section.href.length)
        .split('/')
        .filter(Boolean)
    : [];

  const isOverview = !section && !isProfile;

  return (
    <header className="border-ds-border-muted bg-ds-plain sticky top-0 z-30 flex h-17.5 shrink-0 items-center justify-between gap-4 border-b px-4">
      <div className="flex min-w-0 items-center gap-3">
        {/* Logo — sidebar is hidden on small screens */}
        <Image
          src="/assets/images/logo.png"
          alt={t('logoAlt')}
          width={120}
          height={112}
          priority
          className="h-9 w-auto object-contain lg:hidden"
        />

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {isOverview ? (
                <BreadcrumbPage>{t('title')}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href="/" />}>{t('title')}</BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {isProfile && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{t('profile.breadcrumb')}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}

            {section && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {nestedSegments.length === 0 ? (
                    <BreadcrumbPage>{t(`nav.${section.label}`)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={section.href} />}>
                      {t(`nav.${section.label}`)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </>
            )}

            {section &&
              nestedSegments.map((segment, index) => {
                const isLast = index === nestedSegments.length - 1;
                const href = `${section.href}/${nestedSegments.slice(0, index + 1).join('/')}`;

                return (
                  <span key={href} className="contents">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{formatSegmentLabel(segment)}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink render={<Link href={href} />}>
                          {formatSegmentLabel(segment)}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </span>
                );
              })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <ThemeToggle />
        <div className="lg:hidden">
          <DashboardUserMenu showDetails={false} />
        </div>
      </div>
    </header>
  );
}
