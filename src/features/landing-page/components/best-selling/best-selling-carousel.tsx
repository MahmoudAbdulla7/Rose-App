'use client';

import Autoplay from 'embla-carousel-autoplay';
import { useLocale, useTranslations } from 'next-intl';
import { Children, useMemo, type ReactNode } from 'react';

import { BEST_SELLING_CAROUSEL_AUTOPLAY_CONFIG } from '@/features/landing-page/lib/constants/best-selling-constant';
import { cn } from '@/shared/lib/utils';
import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/shared/ui/carousel';
import { ChevronLeft } from 'lucide-react';

export interface IBestSellingCarouselProps {
  children: ReactNode;
  className?: string;
}

function BestSellingCarouselPrevious() {
  const t = useTranslations('product.bestSelling');
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      type="button"
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label={t('previousSlide')}
      className="bg-maroon-600 dark:bg-maroon-500 shadow-ds-spread focus-visible:ring-ds-ring absolute inset-y-0 start-0 z-10 my-auto inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    >
      <ChevronLeft className="rtl:rotate-180" />
    </button>
  );
}

function BestSellingCarouselNext() {
  const t = useTranslations('product.bestSelling');
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      type="button"
      data-slot="carousel-next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label={t('nextSlide')}
      className="bg-maroon-600 dark:bg-maroon-500 shadow-ds-spread focus-visible:ring-ds-ring absolute inset-y-0 end-0 z-10 my-auto inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    >
      <ChevronLeft className="rotate-180 rtl:rotate-0" />
    </button>
  );
}

export default function BestSellingCarousel({ children, className }: IBestSellingCarouselProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const autoplayPlugin = useMemo(() => Autoplay(BEST_SELLING_CAROUSEL_AUTOPLAY_CONFIG), []);

  return (
    <Carousel
      key={locale}
      opts={{
        align: 'start',
        loop: true,
        direction: isRTL ? 'rtl' : 'ltr',
      }}
      plugins={[autoplayPlugin]}
      className={cn('w-full max-w-5xl px-4.75', className)}
    >
      <CarouselContent>
        {Children.map(children, (child) => (
          <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">{child}</CarouselItem>
        ))}
      </CarouselContent>

      <BestSellingCarouselPrevious />
      <BestSellingCarouselNext />
    </Carousel>
  );
}
