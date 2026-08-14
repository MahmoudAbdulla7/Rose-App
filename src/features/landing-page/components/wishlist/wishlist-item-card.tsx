'use client';

import { ShoppingCart, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import HoveredLink from '@/shared/components/hovered-link';
import { useAddToCart } from '@/shared/hooks/use-add-to-cart.hook';
import { useRemoveFromWishlist } from '@/shared/hooks';
import type { IWishlistItem } from '@/shared/lib/types/wishlist';
import { cn } from '@/shared/lib/utils';
import { getProductDisplayPrice } from '@/shared/lib/utils/product-price.utils';
import { Button, buttonVariants } from '@/shared/ui/button';

type WishlistItemCardProps = {
  item: IWishlistItem;
};

export default function WishlistItemCard({ item }: WishlistItemCardProps) {
  const tWishlist = useTranslations('common.wishlist');
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();
  const { product } = item;
  const productId = item.productId || product.id;
  const outOfStock = product.stock <= 0;
  const { price, originalPrice } = getProductDisplayPrice({
    price: product.price,
    discountType: product.discountType,
    discountValue: product.discountValue,
  });
  const hasSalePrice = originalPrice != null && originalPrice > price;

  const removeItem = () => {
    removeFromWishlist({ id: item.id, productId });
  };

  const addWishlistItemToCart = () => {
    addToCart({ productId, product, quantity: 1 });
  };

  return (
    <article className="flex flex-wrap gap-3 p-3 first:rounded-t-lg last:rounded-b-lg sm:gap-4 sm:p-4 md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-4">
      <HoveredLink
        href={`/products/${product.id}`}
        className="bg-ds-soft relative block size-24 shrink-0 overflow-hidden rounded-md lg:size-28"
      >
        {product.cover ? (
          <Image
            src={product.cover}
            alt={product.title}
            fill
            className={outOfStock ? 'object-cover opacity-35 grayscale' : 'object-cover'}
            sizes="7.25rem"
          />
        ) : (
          <div className="bg-ds-primary-fade size-full" aria-hidden="true" />
        )}
      </HoveredLink>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 py-0.5 md:gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span
            className={cn(
              'inline-flex w-fit items-center rounded-full px-2 py-1 text-xs leading-none font-medium',
              outOfStock
                ? 'bg-ds-danger-fade text-ds-danger'
                : 'bg-ds-success-fade text-ds-success',
            )}
          >
            {outOfStock ? tWishlist('outOfStock') : tWishlist('inStock')}
          </span>
          <HoveredLink href={`/products/${product.id}`} className="min-w-0">
            <h2 className="text-ds-text-plain truncate text-base leading-5 font-semibold sm:text-lg md:leading-6">
              {product.title}
            </h2>
          </HoveredLink>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="bg-ds-warning-fade text-ds-text-plain inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-xs font-semibold md:text-sm">
              <Star
                className="fill-ds-warning text-ds-warning size-3.5 md:size-4"
                aria-hidden="true"
              />
              {tWishlist('ratingValue', { rating: product.rating })}
            </span>
            <span className="text-ds-primary text-xs font-medium md:text-sm">
              {tWishlist('ratingsCount', { count: product.ratings })}
            </span>
          </div>
        </div>

        <p className="text-ds-text-plain flex flex-wrap items-baseline gap-2">
          <span className="text-xl leading-none font-bold">{price.toFixed(2)}</span>
          <span className="text-xs font-medium md:text-sm">EGP</span>
          {hasSalePrice ? (
            <span className="text-ds-text-muted text-sm font-medium line-through">
              {originalPrice.toFixed(2)} EGP
            </span>
          ) : null}
        </p>
      </div>

      <div className="flex w-full items-stretch justify-end gap-2 md:w-auto md:flex-col md:items-end md:justify-between md:gap-4">
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          disabled={isRemoving}
          onClick={removeItem}
          aria-label={tWishlist('remove')}
          className="bg-ds-danger-fade text-ds-danger hover:bg-ds-danger-faint h-10 w-10 md:h-9 md:w-9"
        >
          <Trash2 className="size-5" strokeWidth={1.8} aria-hidden="true" />
        </Button>

        {outOfStock ? (
          <HoveredLink
            href={`/products?categoryId=${product.categoryId}`}
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'h-10! min-w-0 flex-1 px-3 text-sm md:min-w-48 md:flex-none md:px-4',
            )}
          >
            {tWishlist('exploreSimilar')}
          </HoveredLink>
        ) : (
          <Button
            type="button"
            variant="primary"
            disabled={isAddingToCart}
            loading={isAddingToCart}
            onClick={addWishlistItemToCart}
            leftIcon={<ShoppingCart className="size-4" strokeWidth={1.8} aria-hidden="true" />}
            className="h-10! min-w-0 flex-1 px-3 text-sm md:min-w-36 md:flex-none md:px-4"
          >
            {tWishlist('addToCart')}
          </Button>
        )}
      </div>
    </article>
  );
}
