'use client';

import { Flower } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import DashboardUserMenu from './dashboard-user-menu';
import {
  DASHBOARD_NAV_LINKS,
  isDashboardNavLinkActive,
} from '@/features/dashboard/lib/constants/dashboard-nav-links';
import { useRoseViewSwitch } from '@/features/dashboard/lib/hooks/use-rose-view-switch.hook';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';

export default function DashboardSidebar() {
  // Translation
  const t = useTranslations('dashboard');

  // Navigation
  const pathname = usePathname();
  const switchRoseView = useRoseViewSwitch();

  return (
    <aside className="border-ds-border-muted bg-ds-plain sticky top-0 hidden h-dvh w-72 shrink-0 flex-col justify-between border-e py-6 px-8 lg:flex">
      <div className="flex flex-col items-center gap-6 pt-9">
        {/* Logo */}
        <Image
          src="/assets/images/logo.png"
          alt={t('logoAlt')}
          width={120}
          height={112}
          priority
          className="h-28 w-30 object-contain"
        />

        {/* Preview website */}
        <button
          type="button"
          onClick={() => switchRoseView('storefront')}
          className="bg-ds-primary text-ds-text-inverse flex h-12.5 w-full cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold"
        >
          <Flower className="size-6" />
          {t('previewWebsite')}
        </button>

        {/* Navigation */}
        <nav aria-label={t('nav.label')} className="flex w-full flex-col gap-4">
          {DASHBOARD_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = isDashboardNavLinkActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl p-2.5 text-lg font-bold',
                  isActive ? 'bg-ds-primary-fade text-ds-primary' : 'text-ds-text-plain',
                )}
              >
                <Icon className="size-6" />
                {t(`nav.${link.label}`)}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User */}
      <div className="border-ds-border-muted border-t pt-4">
        <DashboardUserMenu />
      </div>
    </aside>
  );
}
