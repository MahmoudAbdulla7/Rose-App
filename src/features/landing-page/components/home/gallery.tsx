import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';

import SectionHeading from '@/features/landing-page/components/home/section-heading';
import { GALLERY_COLUMNS } from '@/features/landing-page/lib/constants/home/gallery.constant';

export default async function Gallery() {
  // Translation
  const locale = await getLocale();
  const isRTL = locale === 'ar';
  const t = await getTranslations('home.gallery');

  return (
    <section className="w-full">
      {/* Heading */}
      <SectionHeading id="gallery-heading">{t('title')}</SectionHeading>

      {/* Images */}
      <div className="mt-10 w-full columns-1 gap-3.5 sm:columns-2 lg:columns-3">
        {GALLERY_COLUMNS.flat().map((image) => (
          <figure
            key={image.id}
            className="group relative mb-3.5 block break-inside-avoid overflow-hidden"
            style={{ aspectRatio: image.aspect }}
          >
            <Image
              src={image.imageUrl}
              alt={isRTL ? image.altAr : image.altEn}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-black/5 transition-colors duration-300 group-hover:bg-black/10 dark:ring-white/10"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
