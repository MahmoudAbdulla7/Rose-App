'use client';

import { HeartPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { useLoginDialog } from '@/features/auth/providers/login-dialog.provider';
import { useAddToWishlist, useWishlist, useRemoveFromWishlist } from '@/shared/hooks';
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
      aria-label={
        isWishlisted ? t('removeFromWishlist', { name: name }) : t('addToWishlist', { name: name })
      }
      disabled={isPending}
      aria-pressed={isWishlisted}
      className="focus-visible:ring-ds-ring inline-flex h-8 cursor-pointer items-center justify-center rounded-full bg-white px-1.5 transition-opacity hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-50"
    >
      <HeartPlus
        className={cn('text-maroon-700 size-4.5', isWishlisted && 'fill-maroon-700')}
        aria-hidden="true"
      />
    </button>
  );
}
