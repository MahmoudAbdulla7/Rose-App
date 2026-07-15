'use client';

import HeaderNav from '@/features/landing-page/components/header-nav';
import { Link } from '@/i18n/navigation';
import LanguageSwitcherComponent from '@/shared/components/language-switcher';
import ThemeToggle from '@/shared/components/theme-toggle';
import { useAuth } from '@/shared/lib/hooks/use-auth.hook';
import { SearchInput } from '@/shared/ui/search-input';
import { Separator } from '@/shared/ui/separator';
import { Bell, Heart, ShoppingCart, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const HEADER_ACTIONS = [
  { href: '/wishlist', labelKey: 'wishlist', icon: Heart },
  { href: '/cart', labelKey: 'cart', icon: ShoppingCart },
  { href: '/notifications', labelKey: 'notifications', icon: Bell },
] as const;

export default function Header() {
  // Translation
  const t = useTranslations('header');

  // Custom hooks
  const { user, isAuthenticated, isLoading } = useAuth();

  // Variables
  const userName = user?.username ?? '';

  return (
    <header className="font-primary sticky top-0 z-50">
      <div className="border-ds-border-muted bg-ds-plain border-b">
        <div className="max-w-8xl mx-auto flex items-center gap-4 px-4 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <Link href="/" className="shrink-0" aria-label={t('homeAria')}>
              <Image
                src="/assets/images/logo.png"
                alt={t('logoAlt')}
                width={180}
                height={72}
                className="h-14 w-auto object-contain md:h-16"
                priority
              />
            </Link>

            <SearchInput
              placeholder={t('searchPlaceholder')}
              wrapperClassName="hidden w-full max-w-full md:block md:min-w-[var(--width-input)] md:flex-1"
            />
          </div>

          <div className="flex shrink-0 items-center">
            {isLoading && <div className="bg-ds-muted h-8 w-24 animate-pulse rounded-lg" />}

            {!isLoading && isAuthenticated && user && (
              <div className="flex items-center gap-2 px-2">
                <span className="text-ds-text-default hidden max-w-28 truncate text-sm sm:inline">
                  {userName}
                </span>
              </div>
            )}

            {!isLoading && !isAuthenticated && (
              <Link
                href="/login"
                className="text-ds-text-default flex items-center gap-1.5 px-2 py-1.5 text-sm"
              >
                <User className="size-4" />
                <span className="hidden sm:inline">{t('login')}</span>
              </Link>
            )}

            <Separator orientation="vertical" className="bg-ds-border-soft mx-2 h-8" />

            {HEADER_ACTIONS.map(({ href, labelKey, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="text-ds-text-default p-2"
                aria-label={t(labelKey)}
              >
                <Icon className="size-5" />
              </Link>
            ))}

            <Separator orientation="vertical" className="bg-ds-border-soft mx-2 h-8" />
            <LanguageSwitcherComponent className="text-sm" />
            <Separator orientation="vertical" className="bg-ds-border-soft mx-2 h-8" />
            <ThemeToggle />
          </div>
        </div>

        <div className="px-4 pb-3 md:hidden">
          <SearchInput placeholder={t('searchPlaceholder')} wrapperClassName="w-full" />
        </div>
      </div>

      <div className="bg-ds-primary">
        <div className="mx-auto max-w-7xl px-2 sm:px-4">
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
