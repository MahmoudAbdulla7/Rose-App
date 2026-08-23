'use client';

import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { IProduct } from '@/shared/lib/types/product';
import { cn } from '@/shared/lib/utils';
import { useAddToCart } from '@/shared/hooks/use-add-to-cart.hook';

type ProductCartButtonProps = {
  productMetadata: IProduct;
  outOfStock: boolean;
  className?: string;
};

export default function ProductCartButton({
  productMetadata,
  outOfStock,
  className,
}: ProductCartButtonProps) {
  const t = useTranslations('product');
  const { mutate: addToCart, isPending } = useAddToCart();

  const handleAdd = () => {
    addToCart({
      productId: productMetadata.id,
      product: productMetadata,
      quantity: 1,
    });
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={outOfStock || isPending}
      aria-label={outOfStock ? t('outOfStock') : t('addToCart', { name: productMetadata.title })}
      className={cn(
        'bg-maroon-600 shadow-ds-spread focus-visible:ring-ds-ring dark:bg-maroon-500 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:size-10.5',
        className,
      )}
    >
      <ShoppingCart className="text-maroon-50 size-5 lg:size-6" aria-hidden="true" />
    </button>
  );
}
