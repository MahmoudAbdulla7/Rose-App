'use client';

import { ShoppingCart, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import HoveredLink from '@/shared/components/hovered-link';
import { useAddToCart } from '@/shared/hooks/use-add-to-cart.hook';
import { useRemoveFromWishlist } from '@/shared/hooks';
import type { IWishlistItem } from '@/shared/lib/types/wishlist';
import { getProductDisplayPrice } from '@/shared/lib/utils/product-price.utils';

type WishlistItemCardProps = {
  item: IWishlistItem;
  onRemoved?: (productId: string) => void;
};

export default function WishlistItemCard({ item, onRemoved }: WishlistItemCardProps) {
  const tWishlist = useTranslations('common.wishlist');
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();
  const { product } = item;
  const outOfStock = product.stock <= 0;
  const { price, originalPrice } = getProductDisplayPrice({
    price: product.price,
    discountType: product.discountType,
    discountValue: product.discountValue,
  });
  const hasSalePrice = originalPrice != null && originalPrice > price;

  const removeItem = () => {
    removeFromWishlist(
      { id: item.id, productId: product.id },
      { onSuccess: () => onRemoved?.(product.id) },
    );
  };

  return (
    <article className="border-ds-border-subtle grid min-h-45 grid-cols-[7.25rem_minmax(0,1fr)] gap-4 border-t py-5 sm:grid-cols-[7.25rem_minmax(0,1fr)_minmax(12rem,14rem)] sm:gap-5 lg:grid-cols-[7.25rem_minmax(0,1fr)_minmax(16rem,22rem)]">
      <HoveredLink
        href={`/products/${product.id}`}
        className="relative block size-29 overflow-hidden rounded-md bg-zinc-50"
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
          <div className="size-full bg-[#f8efeb]" aria-hidden="true" />
        )}
      </HoveredLink>

      <div className="flex min-w-0 flex-col justify-between gap-5 py-0.5">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span
            className={
              outOfStock
                ? 'text-sm leading-none font-medium text-red-600'
                : 'text-sm leading-none font-medium text-emerald-600'
            }
          >
            {outOfStock ? tWishlist('outOfStock') : tWishlist('inStock')}
          </span>
          <HoveredLink href={`/products/${product.id}`} className="min-w-0">
            <h2 className="truncate text-xl leading-6 font-semibold text-zinc-800 dark:text-zinc-100">
              {product.title}
            </h2>
          </HoveredLink>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex h-6 items-center gap-1 rounded-md bg-[#ffca0a] px-1.5 text-sm font-semibold text-zinc-950">
              <Star className="size-4 fill-zinc-950 text-zinc-950" aria-hidden="true" />
              {tWishlist('ratingValue', { rating: product.rating })}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {tWishlist('ratingsCount', { count: product.ratings })}
            </span>
          </div>
        </div>

        <p className="flex flex-wrap items-baseline gap-2 text-zinc-800 dark:text-zinc-100">
          <span className="text-2xl leading-none font-bold">{price.toFixed(2)}</span>
          <span className="text-sm font-medium">EGP</span>
          {hasSalePrice ? (
            <span className="text-ds-text-muted text-base font-medium line-through">
              {originalPrice.toFixed(2)} EGP
            </span>
          ) : null}
        </p>
      </div>

      <div className="col-span-2 flex flex-col items-end justify-between gap-5 sm:col-span-1">
        <button
          type="button"
          disabled={isRemoving}
          onClick={removeItem}
          aria-label={tWishlist('remove')}
          className="inline-flex size-12 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="size-5" strokeWidth={1.8} aria-hidden="true" />
        </button>

        {outOfStock ? (
          <HoveredLink
            href="/products"
            className="inline-flex h-11 min-w-55 items-center justify-center rounded-lg bg-red-50 px-6 text-base font-medium text-[#64151d] transition-colors hover:bg-red-100"
          >
            {tWishlist('exploreSimilar')}
          </HoveredLink>
        ) : (
          <button
            type="button"
            disabled={isAddingToCart}
            onClick={() => addToCart({ productId: product.id, product, quantity: 1 })}
            className="inline-flex h-11 min-w-40 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#64151d] px-5 text-base font-medium text-white transition-colors hover:bg-[#511017] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart className="size-5" strokeWidth={1.8} aria-hidden="true" />
            {tWishlist('addToCart')}
          </button>
        )}
      </div>
    </article>
  );
}
