'use client';

import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { useLoginDialog } from '@/features/auth/providers/login-dialog.provider';

type ProductCartButtonProps = {
  productMetadata: {
    id: string;
    name: string;
    outOfStock: boolean;
  };
  isAuthenticated: boolean;
};

export default function ProductCartButton({
  productMetadata,
  isAuthenticated,
}: ProductCartButtonProps) {
  const t = useTranslations('product');
  const { openLoginDialog } = useLoginDialog();

  const { name, outOfStock } = productMetadata;

  const onAdd = useCallback(() => {
    if (!isAuthenticated) {
      openLoginDialog();
      return;
    }
  }, [isAuthenticated, openLoginDialog]);

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
