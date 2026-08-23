'use client';

import { useToggleWishlist } from '@/shared/hooks/use-toggle-wishlist.hook';
import type { IProduct } from '@/shared/lib/types/product';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { HeartMinus, HeartPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

type WishlistButtonProps = {
  product: IProduct;
  className?: string;
};

export default function WishlistButton({ product }: WishlistButtonProps) {
  const t = useTranslations('product');
  const { isWishlisted, toggle, isPending } = useToggleWishlist(product);

  const Icon = isWishlisted ? HeartMinus : HeartPlus;

  return (
    <Button
      variant="subtle"
      size="icon"
      onClick={toggle}
      disabled={isPending}
      className={cn(
        'size-10 shrink-0 lg:size-11.5',
        isWishlisted
          ? 'dark:text-soft-pink-300 bg-zinc-800 text-white hover:bg-zinc-600 dark:bg-zinc-700'
          : 'text-ds-text-plain bg-zinc-100 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700',
      )}
      aria-label={
        isWishlisted
          ? t('removeFromWishlist', { name: product.title })
          : t('addToWishlist', { name: product.title })
      }
    >
      <Icon className="size-5 lg:size-6" />
    </Button>
  );
}
