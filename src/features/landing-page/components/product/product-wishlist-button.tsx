'use client';

import { HeartMinus, HeartPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { useLoginDialog } from '@/features/auth/providers/login-dialog.provider';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/shared/hooks';
import type { IWishlistItem } from '@/shared/lib/types/wishlist';
import { cn } from '@/shared/lib/utils';
import { stopEvent } from '@/shared/lib/utils/event.utils';

type ProductWishlistButtonProps = {
  productMetadata: {
    id: string;
    name: string;
  };
  isAuthenticated: boolean;
};

export default function ProductWishlistButton({
  productMetadata,
  isAuthenticated,
}: ProductWishlistButtonProps) {
  const t = useTranslations('product');
  const { openLoginDialog } = useLoginDialog();
  const { name, id } = productMetadata;

  const { data: wishlistData } = useWishlist({ enabled: isAuthenticated });
  const { mutate: addToWishlist, isPending: isAddingToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isRemovingFromWishlist } = useRemoveFromWishlist();

  const isWishlisted = useMemo(() => {
    if (!wishlistData || !wishlistData.status) return false;
    return wishlistData.payload.wishlistItems.some(
      (item: IWishlistItem) => item.productId === id || item.product?.id === id,
    );
  }, [wishlistData, id]);

  const isPending = isAddingToWishlist || isRemovingFromWishlist;
  const Icon = isWishlisted ? HeartMinus : HeartPlus;

  const onToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      stopEvent(e);
      if (!isAuthenticated) {
        openLoginDialog();
        return;
      }

      if (isWishlisted) {
        removeFromWishlist({ productId: id });
        return;
      }

      addToWishlist({ productId: id });
    },
    [isAuthenticated, openLoginDialog, isWishlisted, removeFromWishlist, addToWishlist, id],
  );

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isWishlisted ? t('removeFromWishlist', { name }) : t('addToWishlist', { name })}
      disabled={isPending}
      aria-pressed={isWishlisted}
      className={cn(
        'focus-visible:ring-ds-ring group/wishlist inline-flex h-8 cursor-pointer items-center justify-center rounded-full bg-white px-1.5 transition-all hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-50',
        isWishlisted && 'hover:gap-1.5 hover:pe-2.5',
      )}
    >
      <Icon className="text-maroon-700 size-4.5 shrink-0" aria-hidden="true" />
      {isWishlisted ? (
        <span
          className={cn(
            'text-maroon-700 max-w-0 overflow-hidden text-xs leading-none font-medium whitespace-nowrap opacity-0 transition-all duration-200',
            'group-hover/wishlist:max-w-40 group-hover/wishlist:opacity-100',
            'group-focus-visible/wishlist:max-w-40 group-focus-visible/wishlist:opacity-100',
          )}
        >
          {t('removeFromWishlistLabel')}
        </span>
      ) : null}
    </button>
  );
}
