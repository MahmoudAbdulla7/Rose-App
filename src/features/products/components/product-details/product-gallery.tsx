'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';

type ProductGalleryProps = { cover: string; gallery: string[]; alt: string };

export default function ProductGallery({ cover, gallery, alt }: ProductGalleryProps) {
  // Translation
  const t = useTranslations('product');

  // State
  const [active, setActive] = useState(0);

  // Variables (derived)
  const sources = [cover, ...(Array.isArray(gallery) ? gallery : [])].filter(Boolean);
  const current = sources[active];

  return (
    <div className="flex flex-col gap-2.5 max-lg:order-last">
      {/* Main image */}
      <div className="bg-ds-muted relative aspect-605/402 w-full overflow-hidden rounded-2xl">
        {current && (
          <Image
            src={current}
            alt={alt}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 605px, 100vw"
          />
        )}
      </div>

      {/* Thumbnails */}
      <ul className="grid grid-cols-4 gap-2.5 lg:grid-cols-6">
        {sources.map((src, index) => {
          const isActive = index === active;

          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                aria-label={t('productDetails.gallery.thumbnail', { number: index + 1 })}
                className={cn(
                  'bg-ds-muted relative aspect-91/111 w-full cursor-pointer overflow-hidden rounded-lg',
                  isActive && 'border-maroon-600 border-2',
                )}
              >
                {src && <Image src={src} alt="" fill className="object-cover" sizes="91px" />}

                {!isActive && <span aria-hidden className="absolute inset-0 bg-black/30" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
