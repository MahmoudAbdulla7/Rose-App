import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from 'next-intl';

type ComingSoonPageProps = {
  locale: Locale;
  titleKey:
    | 'wishlist'
    | 'cart'
    | 'notifications'
    | 'products'
    | 'categories'
    | 'occasions'
    | 'contact'
    | 'about'
    | 'orders';
};

export default async function ComingSoonPage({ locale, titleKey }: ComingSoonPageProps) {
  setRequestLocale(locale);
  const t = await getTranslations('common.pages');

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-16">
      <h1 className="text-ds-text-plain font-sans text-2xl font-semibold">{t(titleKey)}</h1>
      <p className="text-ds-text-default">{t('comingSoon')}</p>
    </section>
  );
}
