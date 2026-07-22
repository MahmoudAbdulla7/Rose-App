import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import SubscribeForm from './subscribe-form';

const NAV_LINKS = [
  { href: '/', label: 'home' },
  { href: '/products', label: 'products' },
  { href: '/categories', label: 'categories' },
  { href: '/occasions', label: 'occasions' },
  { href: '/contact', label: 'contact' },
  { href: '/about', label: 'about' },
  { href: '/terms', label: 'terms' },
  { href: '/privacy', label: 'privacy' },
  { href: '/faqs', label: 'faqs' },
] as const;

export default async function Footer() {
  // Translation
  const t = await getTranslations('footer');

  return (
    <footer className="bg-zinc-800 py-10 dark:bg-zinc-900">
      <div className="container grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-[2fr_4fr_3fr]">
        {/* Brand */}
        <div className="flex flex-col items-center justify-center gap-1.5">
          <Image
            src="/assets/images/logo.png"
            alt={t('brand')}
            width={240}
            height={225}
            className="h-auto max-w-60 object-contain"
          />
          <p className="text-soft-pink-300 text-center text-lg font-semibold">{t('brand')}</p>
          <p className="text-center text-sm text-zinc-100">{t('rights')}</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-start gap-1.5 md:ps-4" aria-label={t('nav.title')}>
          <p className="text-soft-pink-300 text-lg font-semibold">{t('nav.title')}</p>
          <ul className="flex flex-col items-start gap-1.5">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-soft-pink-300 text-base font-medium text-zinc-100"
                >
                  {t(`nav.${link.label}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Discount / Subscribe */}
        <div className="flex w-full flex-col gap-5 md:col-span-2 lg:col-span-1">
          <div className="">
            <p className="text-soft-pink-300 text-xl font-semibold">
              {t.rich('discount.title', {
                amount: (chunks) => <span className="text-maroon-50">{chunks}</span>,
              })}
            </p>
            <p className="text-sm text-zinc-500">{t('discount.subtitle')}</p>
          </div>

          {/* Subscribe Form */}
          <SubscribeForm />
        </div>
      </div>
    </footer>
  );
}
