'use client';

import { HeartPlus, HeartMinus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/shared/hooks';
import type { IProduct } from '@/shared/lib/types/product';
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
  const { mutate: add } = useAddToWishlist();
  const { mutate: remove } = useRemoveFromWishlist();

  const wishlistItems =
    wishlistData?.status && 'payload' in wishlistData ? wishlistData.payload?.wishlistItems : [];

  const isWishlisted =
    wishlistItems?.some((item) => item.productId === productMetadata.id) ?? false;

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
      disabled={isLoading}
      aria-label={
        isWishlisted
          ? t('removeFromWishlist', { name: productMetadata.title })
          : t('addToWishlist', { name: productMetadata.title })
      }
      aria-pressed={isWishlisted}
      className={cn(
        'group/wishlist inline-flex items-center gap-1 transition-opacity',
        isWishlisted ? 'bg-zinc-800 text-white' : 'text-maroon-700 bg-white',
        isLoading && 'opacity-50',
        className,
      )}
    >
      <Icon className="size-4.5 shrink-0" />
      {showLabel && (
        <span
          className={cn(
            'max-w-0 overflow-hidden text-xs leading-none font-medium whitespace-nowrap opacity-0 transition-all duration-200',
            'group-hover/wishlist:ms-1 group-hover/wishlist:max-w-40 group-hover/wishlist:opacity-100',
            'group-focus-visible/wishlist:max-w-40 group-focus-visible/wishlist:opacity-100',
            labelClassName,
          )}
        >
          {isWishlisted ? t('removeFromWishlistLabel') : t('addToWishlistLabel')}
        </span>
      )}
    </button>
  );
}
