import HeaderAuth from './header-auth';
import HeaderCartLink from './header-cart-link';
import HeaderMobileMenu from './header-mobile-menu';
import HeaderNav from './header-nav';
import { Link } from '@/i18n/navigation';
import LanguageSwitcherComponent from '@/shared/components/language-switcher';
import ThemeToggle from '@/shared/components/theme-toggle';
import { SearchInput } from '@/shared/ui/search-input';
import { Separator } from '@/shared/ui/separator';
import { Heart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import CurrentDeliveryLocation from './current-delivery-location';
import NotificationsDropdown from './notifications-dropdown';

export default async function Header() {
  // Translation
  const t = await getTranslations('header');

  return (
    <header className="font-primary sticky top-0 z-50">
      <div className="border-ds-border-muted bg-ds-plain border-b">
        <div className="max-w-8xl mx-auto flex items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <Link href="/" className="shrink-0" aria-label={t('homeAria')}>
              <Image
                src="/assets/images/logo.png"
                alt={t('logoAlt')}
                width={180}
                height={72}
                className="h-10 w-auto object-contain sm:h-14 md:h-16"
                priority
              />
            </Link>

            <CurrentDeliveryLocation />

            <SearchInput
              placeholder={t('searchPlaceholder')}
              wrapperClassName="hidden min-w-0 flex-1 md:block md:max-w-xl lg:max-w-2xl xl:max-w-none xl:w-input"
            />
          </div>

          <div className="flex shrink-0 items-center">
            <div className="hidden items-center lg:flex">
              <HeaderAuth />
              <Separator orientation="vertical" className="bg-ds-border-soft mx-2 h-8" />
            </div>

            <Link
              href="/wishlist"
              className="text-ds-text-default p-1.5 sm:p-2"
              aria-label={t('wishlist')}
            >
              <Heart className="size-5" />
            </Link>

            <HeaderCartLink />

            <NotificationsDropdown />

            <div className="hidden items-center lg:flex">
              <Separator orientation="vertical" className="bg-ds-border-soft mx-2 h-8" />
              <LanguageSwitcherComponent className="text-sm" />
              <Separator orientation="vertical" className="bg-ds-border-soft mx-2 h-8" />
              <ThemeToggle />
            </div>

            <HeaderMobileMenu />
          </div>
        </div>

        <div className="w-full px-3 pb-2.5 sm:px-4 sm:pb-3 md:hidden">
          <SearchInput placeholder={t('searchPlaceholder')} wrapperClassName="w-full max-w-none" />
        </div>
      </div>

      <div className="bg-ds-primary hidden md:block">
        <div className="mx-auto max-w-7xl px-2 sm:px-4">
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
