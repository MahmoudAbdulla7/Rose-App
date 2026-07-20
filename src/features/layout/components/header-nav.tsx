'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { ClipboardList, Gift, Headphones, Home, Info, PartyPopper } from 'lucide-react';
import { useTranslations } from 'next-intl';

const NAV_LINKS = [
  { href: '/', label: 'home', icon: Home },
  { href: '/products', label: 'products', icon: Gift },
  { href: '/categories', label: 'categories', icon: ClipboardList },
  { href: '/occasions', label: 'occasions', icon: PartyPopper },
  { href: '/contact', label: 'contact', icon: Headphones },
  { href: '/about', label: 'about', icon: Info },
] as const;

function isNavLinkActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

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
      {NAV_LINKS.map((link) => {
        const Icon = link.icon;
        const isActive = isNavLinkActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
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
