'use client';

import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

type ProductCartButtonProps = {
  productId: string;
  productName: string;
  outOfStock?: boolean;
};

export default function ProductCartButton({
  productId,
  productName,
  outOfStock = false,
}: ProductCartButtonProps) {
  const t = useTranslations('product');

  const onAdd = useCallback(() => {
    console.log('onAdd', productId);
  }, [productId]);

  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={outOfStock}
      aria-label={outOfStock ? t('outOfStock') : t('addToCart', { name: productName })}
      className="bg-maroon-600 shadow-ds-subtle focus-visible:ring-ds-ring dark:bg-maroon-500 inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ShoppingCart className="text-maroon-50 size-6" aria-hidden="true" />
    </button>
  );
}
