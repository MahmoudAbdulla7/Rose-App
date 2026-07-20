import HeaderAuth from './header-auth';
import HeaderCartLink from './header-cart-link';
import HeaderNav from './header-nav';
import { Link } from '@/i18n/navigation';
import LanguageSwitcherComponent from '@/shared/components/language-switcher';
import ThemeToggle from '@/shared/components/theme-toggle';
import { SearchInput } from '@/shared/ui/search-input';
import { Separator } from '@/shared/ui/separator';
import { Bell, Heart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Header() {
  // Translation
  const t = await getTranslations('header');

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
            <HeaderAuth />

            <Separator orientation="vertical" className="bg-ds-border-soft mx-2 h-8" />

            <Link href="/wishlist" className="text-ds-text-default p-2" aria-label={t('wishlist')}>
              <Heart className="size-5" />
            </Link>

            <HeaderCartLink />

            <Link
              href="/notifications"
              className="text-ds-text-default p-2"
              aria-label={t('notifications')}
            >
              <Bell className="size-5" />
            </Link>

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
