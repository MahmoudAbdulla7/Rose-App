'use client';

import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

type ProductCartButtonProps = {
  productMetadata: {
    id: string;
    name: string;
    outOfStock: boolean;
  };
};

export default function ProductCartButton({ productMetadata }: ProductCartButtonProps) {
  const t = useTranslations('product');

  const { id, name, outOfStock } = productMetadata;

  const onAdd = useCallback(() => {
    console.log('onAdd', id);
  }, [id]);

  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={outOfStock}
      aria-label={outOfStock ? t('outOfStock') : t('addToCart', { name })}
      className="bg-maroon-600 shadow-ds-spread focus-visible:ring-ds-ring dark:bg-maroon-500 inline-flex size-10.5 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ShoppingCart className="text-maroon-50 size-6" aria-hidden="true" />
    </button>
  );
}
