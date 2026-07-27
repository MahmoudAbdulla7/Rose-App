import { ArrowRight, Check } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import {
  ABOUT_FEATURES,
  ABOUT_IMAGES,
} from '@/features/landing-page/lib/constants/home/about.constant';
import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/button';

export default async function About() {
  // Translations
  const locale = await getLocale();
  const isRTL = locale === 'ar';
  const t = await getTranslations('home.about');

  // Helpers
  const alt = (image: { altEn: string; altAr: string }) => (isRTL ? image.altAr : image.altEn);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[.9fr_1.1fr] xl:gap-20">
        {/* Image Gallery */}
        <div className="grid grid-cols-[1.2fr_.8fr] items-stretch gap-2 max-lg:order-last">
          {/* Hero Image */}
          <div className="relative flex h-full items-start justify-end">
            <div className="before:border-maroon-600 dark:before:border-soft-pink-400 before:rounded-bl-8xl before:rounded-br-8xl before:rounded-tl-6xl before:rounded-tr-8xl relative w-[97%] before:pointer-events-none before:absolute before:inset-s-[-6%] before:top-[-5%] before:h-[106%] before:w-[89%] before:rotate-3 before:border-3 before:content-[''] rtl:before:-rotate-3">
              <div className="bg-ds-primary-fade rounded-bl-8xl rounded-br-8xl rounded-tl-6xl rounded-tr-8xl relative aspect-302/344 w-full overflow-hidden">
                <Image
                  src={ABOUT_IMAGES.hero.imageUrl}
                  alt={alt(ABOUT_IMAGES.hero)}
                  fill
                  sizes="(min-width: 640px) 302px, 236px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Secondary Images */}
          <div className="flex h-full flex-col gap-2">
            <div className="bg-ds-primary-fade relative aspect-square w-full shrink-0 overflow-hidden rounded-full">
              <Image
                src={ABOUT_IMAGES.circle.imageUrl}
                alt={alt(ABOUT_IMAGES.circle)}
                fill
                sizes="(min-width: 640px) 193px, 150px"
                className="object-cover"
              />
            </div>

            <div className="bg-ds-primary-fade rounded-bl-6xl rounded-br-7xl rounded-tl-6xl rounded-tr-7xl relative min-h-0 flex-1 overflow-hidden">
              <Image
                src={ABOUT_IMAGES.wide.imageUrl}
                alt={alt(ABOUT_IMAGES.wide)}
                fill
                sizes="(min-width: 640px) 193px, 150px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="flex flex-col gap-6">
          {/* Section Header */}
          <div className="space-y-2">
            {/* Tagline */}
            <span className="text-soft-pink-500 dark:text-maroon-400 text-base font-bold tracking-[25%] uppercase">
              {t('tagline')}
            </span>

            {/* Title */}
            <h2
              id="about-heading"
              className="text-ds-primary-saturated max-w-151 text-3xl font-bold"
            >
              {t.rich('title', {
                highlight: (chunks) => (
                  <span className="text-soft-pink-500 dark:text-maroon-400">{chunks}</span>
                ),
              })}
            </h2>

            {/* Desc */}
            <p className="text-base leading-[100%] text-zinc-500 dark:text-zinc-400">
              {t('description')}
            </p>
          </div>

          {/* Call to Action */}
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: 'primary' }),
              'max-h-9 w-fit min-w-30.25 gap-2.5 rounded-xl px-4 py-2.5 text-base font-normal',
            )}
          >
            {t('cta')}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
          {/* Feature List */}
          <ul className="grid w-full grid-cols-1 gap-x-6 sm:grid-cols-2">
            {ABOUT_FEATURES.map((feature) => (
              <li key={feature.id} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="dark:text-soft-pink-400 text-maroon-600 grid size-10.5 shrink-0 place-items-center"
                >
                  <Check className="size-5" strokeWidth={2.5} />
                </span>

                <span className="text-ds-text-plain text-sm">{t(`features.${feature.key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
