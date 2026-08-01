'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { highlightMatch } from '@/features/layout/lib/utils/highlight-match.utils';
import { Link } from '@/i18n/navigation';
import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import type { IProduct } from '@/shared/lib/types/product';
import { cn } from '@/shared/lib/utils';
import { getProductDisplayPrice } from '@/shared/lib/utils/product-price.utils';

type HeaderSearchResultItemProps = {
  product: IProduct;
  searchTerm?: string;
  onSelect?: () => void;
};

export default function HeaderSearchResultItem({
  product,
  searchTerm = '',
  onSelect,
}: HeaderSearchResultItemProps) {
  const t = useTranslations('product');
  const { id, title, cover, rating, discountType, discountValue } = product;
  const { price, originalPrice } = getProductDisplayPrice({
    price: product.price,
    discountType,
    discountValue,
  });
  const hasSalePrice = originalPrice != null && originalPrice > price;
  const maxRating = PRODUCTS_OPTIONS.MAX_RATING;

  return (
    <Link
      href={`/products/${id}`}
      onClick={onSelect}
      className="focus-visible:ring-ds-ring hover:bg-ds-soft flex items-center gap-3 rounded-lg p-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="bg-ds-primary-fade relative size-14 shrink-0 overflow-hidden rounded-lg">
        {cover ? (
          <Image src={cover} alt={title} fill className="object-cover" sizes="3.5rem" />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-ds-primary-saturated truncate text-sm font-semibold">
          {searchTerm ? highlightMatch(title, searchTerm) : title}
        </p>

        <div
          className="flex items-center gap-0.5"
          role="img"
          aria-label={t('rating', { rating, maxRating })}
        >
          {Array.from({ length: maxRating }, (_, index) => {
            const isFilled = index < Math.round(rating);
            return (
              <Star
                key={index}
                className={cn(
                  'size-3.5 shrink-0',
                  isFilled ? 'fill-ds-warning text-ds-warning' : 'text-ds-text-subtle fill-none',
                )}
                aria-hidden="true"
              />
            );
          })}
        </div>

        <p className="text-ds-primary-saturated text-sm font-medium">
          <span>{t('price', { price })}</span>
          {hasSalePrice ? (
            <span className="text-ds-text-muted ms-1.5 line-through">
              {t('price', { price: originalPrice })}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
