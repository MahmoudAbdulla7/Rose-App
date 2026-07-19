'use client';

import { Badge } from '@/shared/ui/badge';
import Image from 'next/image';
import HeroCarousel from './hero-carousel';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Banner() {
  const t = useTranslations('hero');
  return (
    <div className="grid grid-cols-[25%_1fr] gap-6.25">
      {/* Card */}
      <div className="relative aspect-1/1.5 size-full">
        <Image
          src="/assets/images/image.png"
          alt={t('banner.card.title')}
          fill
          className="z-0 rounded-4xl object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 space-y-2.5 p-6">
          <Badge className="bg-maroon-50 text-maroon-600">{t('banner.card.badge')}</Badge>
          <h2 className="mb-8 text-2xl font-semibold">{t('banner.card.title')}</h2>
          <Link
            aria-label={t('banner.card.cta')}
            href="/products"
            className="text-maroon-700 bg-maroon-50 flex w-fit items-center gap-1.5 rounded-xl px-6 py-2"
          >
            {t('banner.card.cta')} <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <HeroCarousel />
    </div>
  );
}
