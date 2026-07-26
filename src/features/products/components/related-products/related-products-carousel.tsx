'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Carousel, CarouselContent, useCarousel } from '@/shared/ui/carousel';
import SectionHeading from '@/features/landing-page/components/home/section-heading';

export interface RelatedProductsCarouselProps {
  title: string;
  children: React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
}

function RelatedProductsCarouselPrevious() {
  const t = useTranslations('product.bestSelling');

  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      type="button"
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label={t('previousSlide')}
      className="bg-ds-primary shadow-ds-spread focus-visible:ring-ds-ring absolute inset-y-0 -inset-s-4 z-10 my-auto inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    >
      <ChevronLeft className="text-ds-text-inverse rtl:rotate-180" />
    </button>
  );
}

function RelatedProductsCarouselNext() {
  const t = useTranslations('product.bestSelling');

  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      type="button"
      data-slot="carousel-next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label={t('nextSlide')}
      className="bg-ds-primary shadow-ds-spread focus-visible:ring-ds-ring absolute inset-y-0 -inset-e-4 z-10 my-auto inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    >
      <ChevronLeft className="text-ds-text-inverse rotate-180 rtl:rotate-0" />
    </button>
  );
}

export default function RelatedProductsCarousel({
  title,
  children,
  emptyState,
  className,
}: RelatedProductsCarouselProps) {
  const locale = useLocale();

  const isRTL = locale === 'ar';

  if (!children) {
    return emptyState ? <div className={cn('w-full', className)}>{emptyState}</div> : null;
  }

  return (
    <section className={cn('w-full', className)}>
      <SectionHeading>{title}</SectionHeading>

      <div className="relative mx-auto w-full max-w-7xl px-4.75">
        <Carousel
          key={locale}
          opts={{ align: 'start', loop: true, direction: isRTL ? 'rtl' : 'ltr' }}
          className="my-10 w-full"
        >
          <CarouselContent>{children}</CarouselContent>
          <RelatedProductsCarouselPrevious />
          <RelatedProductsCarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
