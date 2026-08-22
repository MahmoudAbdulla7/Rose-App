import { Package, Star } from 'lucide-react';

import AddToCartButton from '@/features/products/components/product-details/add-to-cart-button';
import ProductGallery from '@/features/products/components/product-details/product-gallery';
import WishlistButton from '@/features/products/components/product-details/wishlist-button';
import EmptyState from '@/shared/components/empty-state';
import { Separator } from '@/shared/ui/separator';
import { getLocale, getTranslations } from 'next-intl/server';
import { getProduct } from '@/shared/lib/apis/product/product.api';
import { getProductDisplayPrice } from '@/shared/lib/utils/product-price.utils';
import type { IProduct } from '@/shared/lib/types/product'; // 👈 import
import ProductRating from '../rating/product-rating';

export default async function ProductDetails({ id }: { id: string }) {
  const locale = await getLocale();
  const t = await getTranslations('product');

  const product = await getProduct(id, { locale });

  if (!product) {
    return (
      <EmptyState
        title={t('productDetails.emptyState.title')}
        subtitle={t('productDetails.emptyState.description')}
      />
    );
  }

  // Cast to IProduct for button components (count is not used)
  const productForActions = product as unknown as IProduct;

  const availableStock = product.stock - product._count.cartItems;
  const {
    price: finalPrice,
    originalPrice,
    hasDiscount,
  } = getProductDisplayPrice({
    price: product.price,
    discountType: product.discountType,
    discountValue: product.discountValue,
  });

  return (
    <div className="container space-y-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-17.5">
        <ProductGallery cover={product.cover} gallery={product.gallery} alt={product.title} />

        <div className="flex flex-col gap-4 lg:h-130.75">
          <div className="flex flex-col gap-2">
            <h2 className="text-ds-text-plain text-3xl font-semibold">{product.title}</h2>

            <div className="flex flex-wrap items-center gap-3.5">
              <div className="flex items-center gap-1.5">
                {hasDiscount && (
                  <del className="text-ds-text-subtle text-3xl font-bold">
                    {t('price', { price: originalPrice! })}
                  </del>
                )}
                <span className="text-ds-text-plain text-3xl font-bold">
                  {t('price', { price: finalPrice })}
                </span>
              </div>

              {availableStock > 0 ? (
                <div className="flex items-center gap-1.5 rounded-4xl bg-zinc-100 px-3 py-1.5 dark:bg-zinc-700">
                  <Package size={20} className="text-ds-text-plain" />
                  <span className="text-ds-text-plain text-sm font-medium">
                    {t('productDetails.leftInStock', { count: Number(availableStock) })}
                  </span>
                </div>
              ) : (
                <div className="bg-ds-danger-fade flex items-center gap-1.5 rounded-4xl px-3 py-1.5">
                  <Package size={20} className="text-ds-danger" />
                  <span className="text-ds-danger text-sm font-medium">{t('outOfStock')}</span>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-zinc-100 dark:bg-zinc-700" />

          <div className="flex items-center gap-1.5">
            <Star size={20} className="fill-ds-warning text-ds-warning" />
            <span className="text-ds-text-plain text-base">
              {t('productDetails.ratingLabel')}{' '}
              <span className="font-medium">
                {t('productDetails.ratingValue', { rating: Number(product.rating), maxRating: 5 })}
              </span>
            </span>
            <span className="text-base font-medium text-blue-600 dark:text-blue-400">
              {t('productDetails.ratingsCount', { count: Number(product.ratings) })}
            </span>
          </div>

          <Separator className="bg-zinc-100 dark:bg-zinc-700" />

          <p className="scrollbar-none text-base leading-relaxed text-zinc-600 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:mask-[linear-gradient(to_bottom,black_calc(100%-2rem),transparent)] dark:text-zinc-400">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex items-stretch gap-2.5">
            <WishlistButton product={productForActions} />
            <AddToCartButton product={productForActions} disabled={availableStock <= 0} />
          </div>
        </div>
      </div>
      <ProductRating
        productId={id}
        rating={Number(product.rating)}
        ratingsCount={Number(product.ratings)}
        reviews={product.reviews}
      />
    </div>
  );
}
