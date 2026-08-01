import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';

export default function AddToCartButton() {
  const t = useTranslations('product');

  return (
    <Button
      variant="primary"
      className="h-11.5 flex-1"
      leftIcon={<ShoppingCart className="size-6" />}
    >
      {t('productDetails.addToCart')}
    </Button>
  );
}
