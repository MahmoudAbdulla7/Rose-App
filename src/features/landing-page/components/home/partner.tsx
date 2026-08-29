import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { PARTNER_LOGOS } from '@/features/landing-page/lib/constants/home/partner.constant';

export default async function Partner() {
  // Translation
  const locale = await getLocale();
  const isRTL = locale === 'ar';
  const t = await getTranslations('home.partner');

  return (
    <section className="w-full">
      <div className="bg-maroon-50 space-y-6 rounded-2xl px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8 lg:space-y-10 lg:rounded-[20px] lg:px-6 lg:py-10 dark:bg-zinc-700">
        <h2 className="text-ds-primary-saturated text-center text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
          {/* Figma keeps the whole heading one color in both themes — no highlight tint */}
          {t.rich('title', { highlight: (chunks) => chunks })}
        </h2>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-x-10 xl:gap-x-18">
          {PARTNER_LOGOS.map((logo) => (
            <li key={logo.id} className="w-full">
              <Image
                src={logo.imageUrl}
                alt={isRTL ? logo.altAr : logo.altEn}
                width={146}
                height={51}
                sizes="(min-width: 1024px) 146px, (min-width: 640px) 33vw, 50vw"
                className="h-auto max-h-9 w-full object-contain sm:max-h-10 lg:max-h-12.75"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
