'use client';

import AutoScroll from 'embla-carousel-auto-scroll';
import React from 'react';

import { Carousel, CarouselContent } from '@/shared/ui/carousel';

export function TestimonialsCarousel({
  children,
  isRTL,
  ...props
}: React.ComponentProps<typeof Carousel> & { isRTL?: boolean }) {
  const plugin = React.useMemo(
    () => AutoScroll({ speed: 2, startDelay: 0, stopOnInteraction: false }),
    [],
  );

  return (
    <Carousel
      opts={{ align: 'start', loop: true, direction: isRTL ? 'rtl' : 'ltr' }}
      plugins={[plugin]}
      {...props}
    >
      <CarouselContent
        className="ms-0 pt-25.75 pb-30.5"
        onMouseEnter={() => plugin.stop()}
        onMouseLeave={() => plugin.play()}
      >
        {children}
      </CarouselContent>
    </Carousel>
  );
}
