import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import { Star } from 'lucide-react';
import Image from 'next/image';

import {
  TESTIMONIALS,
  TESTIMONIAL_MAX_RATING,
} from '@/features/landing-page/lib/constants/home/testimonials.constant';
import SectionHeading, {
  headingHighlight,
} from '@/features/landing-page/components/home/section-heading';
import { TestimonialsCarousel } from '@/features/landing-page/components/home/testimonials-carousel';
import { cn } from '@/shared/lib/utils';
import { CarouselItem } from '@/shared/ui/carousel';

export default async function Testimonials() {
  // Translation
  const locale = await getLocale();
  const isRTL = locale === 'ar';
  const t = await getTranslations('home.testimonials');
  const format = await getFormatter();

  return (
    <section className="pb-34.75">
      {/* Heading */}
      <SectionHeading
        id="testimonials-heading"
        className="container"
        tagline={t('tagline')}
        title={t.rich('title', { highlight: headingHighlight })}
      />

      {/* Review cards */}
      <div className="bg-ds-primary-fade mx-auto mt-10 w-full px-5 sm:px-8 md:px-12 xl:px-20">
        <TestimonialsCarousel isRTL={isRTL}>
          {TESTIMONIALS.map((testimonial) => {
            // Variables
            const name = isRTL ? testimonial.nameAr : testimonial.nameEn;
            const comment = isRTL ? testimonial.commentAr : testimonial.commentEn;
            const ratingLabel = t('ratingLabel', {
              rating: testimonial.rating,
              max: TESTIMONIAL_MAX_RATING,
            });

            return (
              <CarouselItem
                key={testimonial.id}
                className="relative flex basis-full flex-col px-3! ps-0 sm:basis-3/4 md:basis-1/2 md:px-6! xl:basis-1/3"
              >
                {/* Avatar Image */}
                <div className="border-ds-primary-fade bg-ds-plain absolute -top-15 left-1/2 z-10 size-30 -translate-x-1/2 overflow-hidden rounded-full border-4">
                  <Image
                    src={testimonial.imageUrl}
                    alt={name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>

                <article className="bg-ds-plain rounded-5xl shadow-ds-soft-lg flex h-full w-full flex-col items-center px-5 pt-16 pb-5">
                  {/* name */}
                  <h3 className="text-ds-text-plain mb-9 text-base font-semibold">{name}</h3>

                  {/* Rating */}
                  <div
                    className="mb-2.5 flex items-center gap-1"
                    role="img"
                    aria-label={ratingLabel}
                  >
                    {Array.from({ length: TESTIMONIAL_MAX_RATING }).map((_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={cn(
                          'size-4',
                          i < testimonial.rating
                            ? 'fill-ds-warning text-ds-warning'
                            : 'text-ds-warning fill-transparent',
                        )}
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-ds-text-plain mb-9 flex-1 text-start text-base leading-[100%] font-medium">
                    {comment}
                  </p>

                  {/* Time */}
                  <time
                    dateTime={testimonial.date}
                    className="text-ds-text-muted text-xs font-medium"
                  >
                    {format.dateTime(new Date(testimonial.date), { dateStyle: 'long' })}
                  </time>
                </article>
              </CarouselItem>
            );
          })}
        </TestimonialsCarousel>
      </div>
    </section>
  );
}
