import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import ProductCartButton from '@/features/landing-page/components/product/product-cart-button';
import ProductRating from '@/features/landing-page/components/product/product-rating';
import ProductWishlistButton from '@/features/landing-page/components/product/product-wishlist-button';
import HoveredLink from '@/shared/components/hovered-link';
import { PRODUCT_BADGE_VARIANT_CLASSES } from '@/shared/lib/constants/product-badge.constant';
import type { IProduct } from '@/shared/lib/types/product';
import { cn } from '@/shared/lib/utils';
import { getProductDisplayPrice } from '@/shared/lib/utils/product-price.utils';
import BlurredImagePlaceholder from '@/shared/components/blurred-image-placeholder';

export interface IProductCardProps {
  product: IProduct;
  className?: string;
  priority?: boolean;
}

export default async function ProductCard({
  product,
  className,
  priority = false,
}: IProductCardProps) {
  // Translations
  const t = await getTranslations('product');

  // Product data
  const { id, title, cover, rating, stock, discountType, discountValue } = product;
  const { price, originalPrice } = getProductDisplayPrice({
    price: product.price,
    discountType,
    discountValue,
  });
  const outOfStock = stock <= 0;
  const nameId = `product-name-${id}`;
  const stockId = `product-stock-${id}`;
  const hasSalePrice = originalPrice != null && originalPrice > price;
  const productHref = `/products/${id}`;

  return (
    <article
      className={cn(
        'flex w-full min-w-0 flex-col gap-3 rounded-3xl lg:min-w-68 lg:gap-4 lg:rounded-4xl',
        className,
      )}
      data-product-id={id}
      aria-labelledby={nameId}
      aria-describedby={outOfStock ? stockId : undefined}
    >
      {/* Image */}
      <div className="relative h-56 w-full rounded-xl lg:h-72 lg:rounded-2xl">
        <div className="absolute inset-0 overflow-hidden rounded-xl lg:rounded-2xl">
          <HoveredLink
            href={productHref}
            className="absolute inset-0 block"
            aria-labelledby={nameId}
            tabIndex={-1}
          >
            {cover ? (
              <Image
                src={cover}
                alt={title}
                fill
                className="object-cover"
                priority={priority}
                sizes="20rem"
              />
            ) : (
              <BlurredImagePlaceholder />
            )}
          </HoveredLink>
        </div>

        {/* Actions and badges (outside overflow so remove label can expand) */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-between p-2 lg:p-2.5">
          <div className="pointer-events-auto">
            <ProductWishlistButton
              className={cn(
                'group/wishlist focus-visible:ring-ds-ring flex size-fit cursor-pointer items-center justify-center rounded-full p-1.5 transition-all hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-50',
              )}
              productMetadata={product}
            />
          </div>

          {outOfStock && (
            <ul className="m-0 flex list-none items-center gap-1.5 p-0" aria-label={t('badges')}>
              <li>
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs leading-none font-medium whitespace-nowrap',
                    PRODUCT_BADGE_VARIANT_CLASSES.outOfStock,
                  )}
                >
                  {t('outOfStock')}
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex w-full flex-col gap-2 lg:gap-3">
        {/* Name */}
        <HoveredLink href={productHref} className="min-w-0">
          <h3
            id={nameId}
            title={title}
            className="text-maroon-700 dark:text-soft-pink-200 truncate text-base leading-none font-semibold lg:text-lg"
          >
            {title}
          </h3>
        </HoveredLink>

        {outOfStock && (
          <span id={stockId} className="sr-only">
            {t('outOfStock')}
          </span>
        )}

        {/* Price and cart button */}
        <div className="flex items-center gap-2 lg:gap-2.5">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {/* Rating */}
            <ProductRating rating={rating} />

            {/* Price */}
            <p className="text-maroon-700 dark:text-soft-pink-200 text-sm leading-none font-medium lg:text-base">
              <span className="sr-only">{t('currentPrice')}: </span>
              <span>{t('price', { price })}</span>
              {hasSalePrice && (
                <>
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
          <ProductCartButton productMetadata={product} outOfStock={outOfStock} />
        </div>
      </div>
    </article>
  );
}
