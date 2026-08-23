'use client';

import { Link } from '@/i18n/navigation';
import { Badge } from '@/shared/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { HERO_IMAGE_OPTIONS } from '../../lib/constants/home/hero.options';
import HeroCarousel from './hero-carousel';

export default function Banner() {
  const t = useTranslations('hero');
  return (
    <div className="grid grid-cols-1 gap-3 text-white sm:gap-4 md:gap-5 lg:grid-cols-[minmax(0,25%)_minmax(0,1fr)] lg:items-stretch lg:gap-6.25">
      {/* Card */}
      <div className="relative order-2 aspect-4/3 w-full overflow-hidden rounded-3xl sm:aspect-3/4 lg:order-1 lg:aspect-auto lg:h-full lg:min-h-0 lg:rounded-4xl">
        <Image
          src={'/assets/images/image.png'}
          alt={t('banner.card.title')}
          fill
          sizes={HERO_IMAGE_OPTIONS.BANNER_CARD.SIZES}
          className="z-0 object-cover"
          {...HERO_IMAGE_OPTIONS.BANNER_CARD.IMAGE}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 space-y-2.5 p-4 sm:p-6">
          <Badge className="bg-maroon-50 text-maroon-600 dark:bg-soft-pink-300 dark:text-zinc-800">
            {t('banner.card.badge')}
          </Badge>
          <h2 className="mb-3 text-lg font-semibold sm:mb-5 sm:text-xl lg:mb-8 lg:text-2xl">
            {t('banner.card.title')}
          </h2>
          <Link
            aria-label={t('banner.card.cta')}
            href="/products"
            className="text-maroon-700 bg-maroon-50 dark:bg-soft-pink-300 flex w-fit items-center gap-1.5 rounded-xl px-4 py-2 text-sm sm:px-6 sm:text-base dark:text-zinc-800"
          >
            {t('banner.card.cta')} <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div className="order-1 min-w-0 lg:order-2 lg:h-full">
        <HeroCarousel />
      </div>
    </div>
  );
}
