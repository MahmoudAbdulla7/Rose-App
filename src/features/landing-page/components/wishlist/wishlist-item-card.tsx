'use client';

import { Check, Loader2, Search, ShoppingCart, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import HoveredLink from '@/shared/components/hovered-link';
import { useAddToCart, useCart, useRemoveFromWishlist } from '@/shared/hooks';
import type { IWishlistItem } from '@/shared/lib/types/wishlist';
import { cn } from '@/shared/lib/utils';
import { getProductDisplayPrice } from '@/shared/lib/utils/product-price.utils';
import { Button, buttonVariants } from '@/shared/ui/button';

const mobileActionTooltipClassName =
  'pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-64 -translate-x-1/2 rounded-lg bg-zinc-900 px-3 py-2 text-center text-xs font-medium text-white shadow-md opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100';

type MobileIconTooltipProps = {
  label: string;
  children: ReactNode;
};

function MobileIconTooltip({ label, children }: MobileIconTooltipProps) {
  return (
    <span className="group relative inline-flex sm:hidden">
      {children}
      <span role="tooltip" className={mobileActionTooltipClassName}>
        {label}
      </span>
    </span>
  );
}

type WishlistItemCardProps = {
  item: IWishlistItem;
};

export default function WishlistItemCard({ item }: WishlistItemCardProps) {
  const tWishlist = useTranslations('common.wishlist');
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();
  const { isAuthenticated, cartItems, guestCartList } = useCart();
  const { product } = item;
  const productId = item.productId || product.id;
  const outOfStock = product.stock <= 0;
  const activeCartItems = isAuthenticated ? cartItems : guestCartList;
  const cartItem = activeCartItems.find((cartEntry) => cartEntry.productId === productId);
  const isInCart = Boolean(cartItem);
  const cartQuantity = cartItem?.quantity ?? 0;
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
    <article className="grid min-h-45 grid-cols-[7.25rem_minmax(0,1fr)] gap-4 p-4 first:rounded-t-lg last:rounded-b-lg sm:grid-cols-[7.25rem_minmax(0,1fr)_minmax(12rem,14rem)] sm:gap-5 lg:grid-cols-[7.25rem_minmax(0,1fr)_minmax(16rem,22rem)]">
      <HoveredLink
        href={`/products/${product.id}`}
        className="bg-ds-soft relative block size-29 overflow-hidden rounded-md"
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

      <div className="flex min-w-0 items-stretch gap-3 sm:contents">
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 py-0.5">
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
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
              {isInCart && !outOfStock ? (
                <span className="bg-ds-primary-fade text-ds-primary inline-flex w-fit items-center gap-1 rounded-full px-2 py-1 text-xs leading-none font-medium">
                  <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                  {cartQuantity > 1
                    ? tWishlist('inCartQuantity', { count: cartQuantity })
                    : tWishlist('inCart')}
                </span>
              ) : null}
            </div>
            <HoveredLink href={`/products/${product.id}`} className="min-w-0">
              <h2 className="text-ds-text-plain truncate text-xl leading-6 font-semibold">
                {product.title}
              </h2>
            </HoveredLink>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="bg-ds-warning-fade text-ds-text-plain inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-sm font-semibold">
                <Star className="fill-ds-warning text-ds-warning size-4" aria-hidden="true" />
                {tWishlist('ratingValue', { rating: product.rating })}
              </span>
              <span className="text-ds-primary text-sm font-medium">
                {tWishlist('ratingsCount', { count: product.ratings })}
              </span>
            </div>
          </div>

          <p className="text-ds-text-plain flex flex-wrap items-baseline gap-2">
            <span className="text-2xl leading-none font-bold">{price.toFixed(2)}</span>
            <span className="text-sm font-medium">EGP</span>
            {hasSalePrice ? (
              <span className="text-ds-text-muted text-base font-medium line-through">
                {originalPrice.toFixed(2)} EGP
              </span>
            ) : null}
          </p>
        </div>

        <div className="flex shrink-0 sm:flex-col items-end justify-between gap-3 sm:gap-5">
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            disabled={isRemoving}
            onClick={removeItem}
            aria-label={tWishlist('remove')}
            className="bg-ds-danger-fade text-ds-danger hover:bg-ds-danger-faint"
          >
            <Trash2 className="size-5" strokeWidth={1.8} aria-hidden="true" />
          </Button>

          {outOfStock ? (
            <>
              <MobileIconTooltip label={tWishlist('exploreSimilar')}>
                <HoveredLink
                  href={`/products?categoryId=${product.categoryId}`}
                  aria-label={tWishlist('exploreSimilar')}
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'icon-lg' }),
                    'size-11',
                  )}
                >
                  <Search className="size-5" strokeWidth={1.8} aria-hidden="true" />
                </HoveredLink>
              </MobileIconTooltip>

              <HoveredLink
                href={`/products?categoryId=${product.categoryId}`}
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'hidden h-11 min-w-55 px-6 text-base sm:inline-flex',
                )}
              >
                {tWishlist('exploreSimilar')}
              </HoveredLink>
            </>
          ) : isInCart ? (
            <>
              <MobileIconTooltip label={tWishlist('viewCart')}>
                <HoveredLink
                  href="/cart"
                  aria-label={tWishlist('viewCart')}
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'icon-lg' }),
                    'size-11',
                  )}
                >
                  <Check className="size-5" strokeWidth={2} aria-hidden="true" />
                </HoveredLink>
              </MobileIconTooltip>

              <HoveredLink
                href="/cart"
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'hidden h-11 min-w-40 px-5 text-base sm:inline-flex',
                )}
              >
                <Check className="size-5" strokeWidth={2} aria-hidden="true" />
                {tWishlist('viewCart')}
              </HoveredLink>
            </>
          ) : (
            <>
              <MobileIconTooltip label={tWishlist('addToCart')}>
                <Button
                  type="button"
                  variant="primary"
                  size="icon-lg"
                  disabled={isAddingToCart}
                  onClick={addWishlistItemToCart}
                  aria-label={tWishlist('addToCart')}
                  className="size-11"
                >
                  {isAddingToCart ? (
                    <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <ShoppingCart className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  )}
                </Button>
              </MobileIconTooltip>

              <Button
                type="button"
                variant="primary"
                disabled={isAddingToCart}
                loading={isAddingToCart}
                onClick={addWishlistItemToCart}
                leftIcon={<ShoppingCart className="size-5" strokeWidth={1.8} aria-hidden="true" />}
                className="hidden h-11 min-w-40 px-5 text-base sm:inline-flex"
              >
                {tWishlist('addToCart')}
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
