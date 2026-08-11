'use client';

import { HeartMinus, HeartPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/shared/hooks';
import type { IProduct } from '@/shared/lib/types/product';
import type { IWishlistItem } from '@/shared/lib/types/wishlist';
import { cn } from '@/shared/lib/utils';

type ProductWishlistButtonProps = {
  productMetadata: IProduct;
  className?: string;
  showLabel?: boolean;
  labelClassName?: string;
};

export default function ProductWishlistButton({
  className,
  productMetadata,
  showLabel = true,
  labelClassName,
}: ProductWishlistButtonProps) {
  const t = useTranslations('product');
  const { data: wishlistData, isLoading } = useWishlist();
  const { mutate: add, isPending: isAddingToWishlist } = useAddToWishlist();
  const { mutate: remove, isPending: isRemovingFromWishlist } = useRemoveFromWishlist();

  const wishlistItems =
    wishlistData?.status === true ? wishlistData.payload.wishlistItems : undefined;

  const isWishlisted =
    wishlistItems?.some((item: IWishlistItem) => item.productId === productMetadata.id) ?? false;

  const isPending = isAddingToWishlist || isRemovingFromWishlist;
  const Icon = isWishlisted ? HeartMinus : HeartPlus;

  const toggle = () => {
    if (isWishlisted) {
      remove({ productId: productMetadata.id });
    } else {
      add({ productId: productMetadata.id, product: productMetadata });
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        isWishlisted
          ? t('removeFromWishlist', { name: productMetadata.title })
          : t('addToWishlist', { name: productMetadata.title })
      }
      disabled={isLoading || isPending}
      aria-pressed={isWishlisted}
      className={cn(
        'focus-visible:ring-ds-ring group/wishlist inline-flex h-8 cursor-pointer items-center justify-center rounded-full bg-white px-1.5 transition-all hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-50',
        isWishlisted && 'hover:gap-1.5 hover:pe-2.5',
        className,
      )}
    >
      <Icon className="text-maroon-700 size-4.5 shrink-0" aria-hidden="true" />
      {showLabel && isWishlisted ? (
        <span
          className={cn(
            'text-maroon-700 max-w-0 overflow-hidden text-xs leading-none font-medium whitespace-nowrap opacity-0 transition-all duration-200',
            'group-hover/wishlist:max-w-40 group-hover/wishlist:opacity-100',
            'group-focus-visible/wishlist:max-w-40 group-focus-visible/wishlist:opacity-100',
            labelClassName,
          )}
        >
          {t('removeFromWishlistLabel')}
        </span>
      ) : null}
    </button>
  );
}
