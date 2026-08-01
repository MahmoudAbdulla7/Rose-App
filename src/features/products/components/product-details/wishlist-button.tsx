'use client';

import { HeartPlus, HeartMinus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from '@/shared/hooks';
import type { IProduct } from '@/shared/lib/types/product';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

type WishlistButtonProps = {
  product: IProduct;
};

export default function WishlistButton({ product }: WishlistButtonProps) {
  const t = useTranslations('product');
  const { data: wishlistData, isLoading } = useWishlist();
  const { mutate: add, isPending: adding } = useAddToWishlist();
  const { mutate: remove, isPending: removing } = useRemoveFromWishlist();

  const wishlistItems =
    wishlistData && 'payload' in wishlistData ? wishlistData.payload?.wishlistItems : undefined;

  const isWishlisted = wishlistItems?.some((item) => item.productId === product.id) ?? false;

  const isPending = adding || removing;

  const toggle = () => {
    if (isWishlisted) {
      remove({ productId: product.id });
    } else {
      add({ productId: product.id, product });
    }
  };

  return (
    <Button
      variant="subtle"
      size="icon"
      className={cn(
        'size-11.5 shrink-0 text-black',
        isWishlisted ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black',
      )}
      onClick={toggle}
      disabled={isLoading || isPending}
      aria-label={
        isWishlisted
          ? t('removeFromWishlist', { name: product.title })
          : t('addToWishlist', { name: product.title })
      }
    >
      {isWishlisted ? <HeartMinus className="size-6" /> : <HeartPlus className="size-6" />}
    </Button>
  );
}
