'use client';

import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAddToCart } from '@/shared/hooks/use-add-to-cart.hook';
import { Button } from '@/shared/ui/button';
import type { IProduct } from '@/shared/lib/types/product';

type AddToCartButtonProps = {
  product: IProduct;
  disabled?: boolean;
};

export default function AddToCartButton({ product, disabled = false }: AddToCartButtonProps) {
  const t = useTranslations('product');
  const { mutate: addToCart, isPending } = useAddToCart();

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      product,
      quantity: 1,
    });
  };

  return (
    <Button
      variant="primary"
      className="h-11.5 flex-1"
      onClick={handleAdd}
      disabled={disabled || isPending}
      leftIcon={<ShoppingCart className="size-6" />}
    >
      {t('productDetails.addToCart')}
    </Button>
  );
}
