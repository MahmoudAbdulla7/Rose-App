'use client';

import { HeartPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { cn } from '@/shared/lib/utils';

type ProductWishlistButtonProps = {
  productId: string;
  productName: string;
  isWishlisted?: boolean;
};

export default function ProductWishlistButton({
  productId,
  productName,
  isWishlisted = false,
}: ProductWishlistButtonProps) {
  const t = useTranslations('product');

  const onToggle = useCallback(() => {
    console.log('onToggle', productId);
  }, [productId]);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={
        isWishlisted
          ? t('removeFromWishlist', { name: productName })
          : t('addToWishlist', { name: productName })
      }
      aria-pressed={isWishlisted}
      className="focus-visible:ring-ds-ring inline-flex h-8 cursor-pointer items-center justify-center rounded-full bg-white px-1.5 transition-opacity hover:opacity-90 focus-visible:ring focus-visible:outline-none"
    >
      <HeartPlus
        className={cn('text-maroon-700 size-4.5', isWishlisted && 'fill-maroon-700')}
        aria-hidden="true"
      />
    </button>
  );
}
