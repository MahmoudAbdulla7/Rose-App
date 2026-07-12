import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';

import ProductCartButton from '@/features/landing-page/components/product-cart-button';
import ProductRating from '@/features/landing-page/components/product-rating';
import ProductWishlistButton from '@/features/landing-page/components/product-wishlist-button';
import { PRODUCT_BADGE_VARIANT_CLASSES } from '@/shared/lib/constants/product-badge.constant';
import { cn } from '@/shared/lib/utils';
import type { IProduct } from '@/features/landing-page/lib/types/product';

export interface IProductCardProps {
  product: IProduct;
  className?: string;
}

export default async function ProductCard({ product, className }: IProductCardProps) {
  // Translations
  const locale = await getLocale();
  const isRTL = locale === 'ar';
  const t = await getTranslations('product');

  // Product data
  const {
    id,
    nameEn,
    nameAr,
    imageUrl,
    price,
    originalPrice,
    rating,
    maxRating,
    badges,
    outOfStock,
    isWishlisted,
  } = product;

  const name = isRTL ? nameAr : nameEn;
  const nameId = `product-name-${id}`;
  const stockId = `product-stock-${id}`;
  const hasSalePrice = originalPrice != null && originalPrice > price;
  const hasBadges = Boolean(badges && badges.length > 0);

  return (
    <article
      className={cn('flex w-full max-w-xs flex-col gap-4 rounded-4xl', className)}
      data-product-id={id}
      aria-labelledby={nameId}
      aria-describedby={outOfStock ? stockId : undefined}
    >
      {/* Image */}
      <div className="relative h-72 w-full overflow-hidden rounded-2xl">
        {imageUrl ? (
          <Image src={imageUrl} alt="" fill className="object-cover" priority sizes="20rem" />
        ) : (
          <div className="bg-maroon-50 size-full" aria-hidden="true" />
        )}

        {/* Actions and badges */}
        <div className="absolute inset-0 z-10 flex items-start justify-between p-2.5">
          <ProductWishlistButton productId={id} productName={name} isWishlisted={isWishlisted} />

          {hasBadges && badges && (
            <ul className="m-0 flex list-none items-center gap-1.5 p-0" aria-label={t('badges')}>
              {badges.map((badge) => (
                <li key={`${badge.variant}-${isRTL ? badge.labelAr : badge.labelEn}`}>
                  <span
                    className={cn(
                      'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs leading-none font-medium whitespace-nowrap',
                      PRODUCT_BADGE_VARIANT_CLASSES[badge.variant],
                    )}
                  >
                    {isRTL ? badge.labelAr : badge.labelEn}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex w-full flex-col gap-3">
        {/* Name */}
        <h3
          id={nameId}
          title={name}
          className="text-maroon-700 dark:text-soft-pink-200 truncate text-lg leading-none font-semibold"
        >
          {name}
        </h3>

        {outOfStock && (
          <span id={stockId} className="sr-only">
            {t('outOfStock')}
          </span>
        )}

        {/* Price and cart button */}
        <div className="flex items-center gap-2.5">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {/* Rating */}
            <ProductRating rating={rating} maxRating={maxRating} />

            {/* Price */}
            <p className="text-maroon-700 dark:text-soft-pink-200 text-base leading-none font-medium">
              <span className="sr-only">{t('currentPrice')}: </span>
              <span>{t('price', { price })}</span>
              {hasSalePrice && (
                <>
                  {' '}
                  <span className="sr-only">
                    {t('originalPrice')}: {t('price', { price: originalPrice })}
                  </span>
                  <span className="text-zinc-400 line-through" aria-hidden="true">
                    {t('price', { price: originalPrice })}
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Cart button */}
          <ProductCartButton productId={id} productName={name} outOfStock={outOfStock} />
        </div>
      </div>
    </article>
  );
}
