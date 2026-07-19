'use client';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/button';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/shared/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CAROUSEL_SLIDES } from '../../lib/constants/carousel.constant';

export default function HeroCarousel() {
  // Carousel API state
  const [api, setApi] = useState<CarouselApi>();
  //Prev button disabled state
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  // Current slide index state
  const [current, setCurrent] = useState(0);

  const path = usePathname();

  const t = useTranslations('hero.banner');

  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setCurrent(api.selectedScrollSnap());
    };

    // Initial state
    updateState();

    // Listen to select and reInit events
    api.on('select', updateState);
    api.on('reInit', updateState);

    return () => {
      api.off('select', updateState);
      api.off('reInit', updateState);
    };
  }, [api]);

  const slides = CAROUSEL_SLIDES;

  const SLIDES_COUNT = slides.length;

  return (
    <>
      <Carousel
        className="overflow-hidden rounded-4xl"
        setApi={setApi}
        opts={{
          align: 'start',
          slidesToScroll: 1,
          direction: path.includes('/ar') ? 'rtl' : 'ltr',
        }}
      >
        {/* Carousel Indicators */}
        <div className="absolute top-0 z-10 flex gap-2 p-7 ltr:right-0 rtl:left-0">
          {Array.from({ length: SLIDES_COUNT }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all ${current === index ? 'bg-maroon-600 w-10' : 'bg-maroon-50 size-2.5'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Main Slides */}
        <CarouselContent className="aspect-video object-cover">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative">
              <Image src={slide.image} alt={slide.alt} fill />
              <div className="absolute inset-0 from-black/80 from-0% via-10% to-transparent p-9 ltr:bg-linear-to-r rtl:bg-linear-to-l" />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Title */}
        <div className="absolute bottom-0 w-full p-9">
          <div className="space-y-1.5">
            <h3 className="text-4xl font-semibold">{t('carousel.title')}</h3>
            <p>{t('carousel.description')}</p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <Link
              href="/products"
              className="text-maroon-700 bg-maroon-50 w-fit rounded-xl px-6 py-2"
            >
              {t('carousel.cta')}
            </Link>

            {/* Carousel Nav Buttons */}
            <div className="bg-maroon-50 *:text-maroon-700 flex items-center justify-evenly rounded-full *:bg-transparent *:p-3.5 *:hover:bg-transparent *:disabled:bg-transparent rtl:*:rotate-180">
              <Button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev || slides.length <= 1}
              >
                <ChevronLeft strokeWidth={2} className="size-6" />
              </Button>
              <Button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext || slides.length <= 1}
              >
                <ChevronRight strokeWidth={2} className="size-6" />
              </Button>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  );
}
