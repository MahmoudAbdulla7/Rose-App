import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import { Star } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import SectionHeading from '@/features/landing-page/components/home/section-heading';
import { getTestimonials } from '@/features/landing-page/lib/api/testimonials.api';
import { TESTIMONIALS_OPTIONS } from '@/features/landing-page/lib/api/testimonials.options';
import EmptyState from '@/shared/components/empty-state';
import LoadErrorBoundary from '@/shared/components/load-error-boundary';
import { cn } from '@/shared/lib/utils';
import { CarouselItem } from '@/shared/ui/carousel';

const TestimonialsCarousel = dynamic(
  () =>
    import('@/features/landing-page/components/home/testimonials-carousel').then(
      (m) => m.TestimonialsCarousel,
    ),
);

export default function Testimonials() {
  return (
    <LoadErrorBoundary entity="testimonials">
      <TestimonialsContent />
    </LoadErrorBoundary>
  );
}

async function TestimonialsContent() {
  // Translation
  const locale = await getLocale();
  const isRTL = locale === 'ar';
  const t = await getTranslations('home.testimonials');
  const format = await getFormatter();

  // Query
  const testimonials = await getTestimonials({ locale });

  if (!testimonials.length) {
    return <EmptyState title={t('emptyState.title')} subtitle={t('emptyState.description')} />;
  }

  return (
    <section className="w-full">
      {/* Heading */}
      <div className="container">
        <SectionHeading id="testimonials-heading">{t('title')}</SectionHeading>
      </div>

      {/* Review cards — full-bleed band */}
      <div className="bg-ds-primary-fade mt-10 w-full">
        <TestimonialsCarousel isRTL={isRTL} className="container">
          {testimonials.map((testimonial) => {
            // Variables
            const ratingLabel = t('ratingLabel', {
              rating: testimonial.rating,
              max: TESTIMONIALS_OPTIONS.MAX_RATING,
            });

            return (
              <CarouselItem
                key={testimonial.id}
                className="relative flex basis-full flex-col px-3! ps-0 sm:basis-3/4 md:basis-1/2 md:px-6! xl:basis-1/3"
              >
                {/* Avatar Image */}
                <div className="absolute -top-15 left-1/2 z-10 size-30 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-white">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="bg-ds-primary-fade flex size-full items-center justify-center text-3xl font-semibold text-zinc-500 uppercase"
                    >
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
                </div>

                <article className="rounded-5xl shadow-ds-soft-lg flex h-full w-full flex-col items-center bg-white px-5 pt-16 pb-5">
                  {/* name */}
                  <h3 className="mb-9 text-base font-semibold text-zinc-800">{testimonial.name}</h3>

                  {/* Rating */}
                  <div
                    className="mb-2.5 flex items-center gap-1"
                    role="img"
                    aria-label={ratingLabel}
                  >
                    {Array.from({ length: TESTIMONIALS_OPTIONS.MAX_RATING }).map((_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={cn(
                          'size-4',
                          'text-yellow-400',
                          i < testimonial.rating ? 'fill-yellow-400' : 'fill-transparent',
                        )}
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="mb-9 flex-1 text-start text-base leading-[100%] font-medium text-zinc-800">
                    {testimonial.content}
                  </p>

                  {/* Time */}
                  <time
                    dateTime={new Date(testimonial.createdAt).toISOString()}
                    className="text-xs font-medium text-zinc-400"
                  >
                    {format.dateTime(new Date(testimonial.createdAt), { dateStyle: 'long' })}
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
