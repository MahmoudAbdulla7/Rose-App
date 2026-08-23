'use client';
import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/shared/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CAROUSEL_SLIDES } from '../../lib/constants/home/carousel.constant';
import { HERO_IMAGE_OPTIONS } from '../../lib/constants/home/hero.options';

export default function HeroCarousel() {
  // Translation
  const locale = useLocale();
  const t = useTranslations('hero.banner');
  const tProduct = useTranslations('product.bestSelling');
  const isRtl = locale === 'ar';

  // Current slide index state
  const [current, setCurrent] = useState(0);

  // Carousel API state
  const [api, setApi] = useState<CarouselApi>();

  //Button disabled states
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setCurrent(api.selectedScrollSnap());
    };

    // Initial state
    updateState();

    api.on('select', updateState);
    api.on('reInit', updateState);

    return () => {
      api.off('select', updateState);
      api.off('reInit', updateState);
    };
  }, [api]);

  const SLIDES_COUNT = CAROUSEL_SLIDES.length;

  return (
    <>
      <Carousel
        className="overflow-hidden rounded-4xl"
        setApi={setApi}
        opts={{
          align: 'start',
          slidesToScroll: 1,
          direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        {/* Carousel Indicators */}
        <div className="absolute top-0 z-10 flex gap-2 p-4 sm:p-7 ltr:right-0 rtl:left-0">
          {Array.from({ length: SLIDES_COUNT }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn`h-2.5 rounded-full transition-all ${current === index ? 'bg-maroon-600 dark:bg-maroon-500 w-10' : 'bg-maroon-50 dark:bg-white/40 size-2.5'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Main Slides */}
        <CarouselContent className="aspect-4/3 object-cover sm:aspect-video">
          {CAROUSEL_SLIDES.map((slide, index) => {
            const { LCP_SLIDE_INDEX, NEIGHBOR_DISTANCE, IMAGE, SIZES } =
              HERO_IMAGE_OPTIONS.CAROUSEL;
            const isLcpSlide = index === LCP_SLIDE_INDEX && current === LCP_SLIDE_INDEX;
            const shouldRenderSlide =
              Math.abs(index - current) <= NEIGHBOR_DISTANCE;

            return (
              <CarouselItem key={index} className="relative">
                {shouldRenderSlide ? (
                  <Image
                    src={slide.image}
                    alt={slide.alt + (index + 1)}
                    fill
                    sizes={SIZES}
                    className="object-cover"
                    {...(isLcpSlide ? IMAGE.LCP : IMAGE.DEFAULT)}
                  />
                ) : null}
                <div className="absolute inset-0 from-black/80 from-0% via-10% to-transparent p-4 sm:p-9 ltr:bg-linear-to-r rtl:bg-linear-to-l" />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Carousel Title */}
        <div className="absolute bottom-0 w-full p-4 sm:p-9">
          <div className="space-y-1.5">
            <h3 className="text-2xl font-semibold text-white sm:text-4xl">{t('carousel.title')}</h3>
            <p className="text-sm text-white/90 sm:text-base">{t('carousel.description')}</p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 sm:mt-6 sm:gap-4">
            <Link
              href="/products"
              className="text-maroon-700 bg-maroon-50 dark:bg-soft-pink-300 dark:text-zinc-800 w-fit rounded-xl px-4 py-2 text-sm sm:px-6 sm:text-base"
            >
              {t('carousel.cta')}
            </Link>

            {/* Carousel Nav Buttons */}
            <div className="bg-maroon-50 h-10! flex items-center justify-between dark:bg-zinc-800/80 *:text-maroon-700 dark:*:text-zinc-50 rounded-full *:bg-transparent *:px-3 *:hover:bg-transparent *:disabled:bg-transparent rtl:*:rotate-180">
              <Button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev || CAROUSEL_SLIDES.length <= 1}
                aria-label={tProduct('previousSlide')}
              >
                <ChevronLeft strokeWidth={2} aria-hidden="true" />
              </Button>
              <Button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext || CAROUSEL_SLIDES.length <= 1}
                aria-label={tProduct('nextSlide')}
              >
                <ChevronRight strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  );
}
