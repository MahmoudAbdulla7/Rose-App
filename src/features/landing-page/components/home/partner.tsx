import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { PARTNER_LOGOS } from '@/features/landing-page/lib/constants/home/partner.constant';

export default async function Partner() {
  // Translation
  const locale = await getLocale();
  const isRTL = locale === 'ar';
  const t = await getTranslations('home.partner');

  return (
    <section className="mx-auto px-5 sm:px-8 md:px-12 xl:px-20">
      <div className="bg-ds-primary-fade space-y-10 rounded-[20px] px-6 py-10">
        <h2 className="text-ds-primary-saturated text-center text-3xl font-bold md:text-4xl">
          {t.rich('title', {
            highlight: (chunks) => <span className="text-ds-secondary">{chunks}</span>,
          })}
        </h2>

        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-10 xl:gap-x-18">
          {PARTNER_LOGOS.map((logo) => (
            <li key={logo.id} className="w-full">
              <Image
                src={logo.imageUrl}
                alt={isRTL ? logo.altAr : logo.altEn}
                width={146}
                height={51}
                sizes="(min-width: 1024px) 146px, (min-width: 640px) 33vw, 50vw"
                className="h-auto max-h-12.75 w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
