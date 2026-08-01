import { HeartMinus, HeartPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/button';

const isInWishlist = false;

export default function WishlistButton({ name }: { name: string }) {
  const t = useTranslations('product');

  return (
    <Button
      variant="subtle"
      size="icon"
      aria-label={isInWishlist ? t('removeFromWishlist', { name }) : t('addToWishlist', { name })}
      className="size-11.5"
    >
      {isInWishlist ? <HeartMinus className="size-6" /> : <HeartPlus className="size-6" />}
    </Button>
  );
}
