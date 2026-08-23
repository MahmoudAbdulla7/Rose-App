'use client';

import { HeartMinus, HeartPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';
import type { IProduct } from '@/shared/lib/types/product';
import { useToggleWishlist } from '@/shared/hooks/use-toggle-wishlist.hook';

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
  const { isWishlisted, toggle, isPending } = useToggleWishlist(productMetadata);
  const Icon = isWishlisted ? HeartMinus : HeartPlus;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        isWishlisted
          ? t('removeFromWishlist', { name: productMetadata.title })
          : t('addToWishlist', { name: productMetadata.title })
      }
      disabled={isPending}
      aria-pressed={isWishlisted}
      className={cn(
        'focus-visible:ring-ds-ring group/wishlist inline-flex h-8 cursor-pointer items-center justify-center rounded-full bg-white px-1.5 transition-all hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-50',
        isWishlisted && 'hover:gap-1.5 hover:pe-2.5',
        className,
      )}
    >
      <Icon className="text-maroon-700 size-4 shrink-0 lg:size-4.5" aria-hidden="true" />
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
