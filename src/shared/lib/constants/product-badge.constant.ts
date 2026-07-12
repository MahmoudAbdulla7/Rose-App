import type { IProductBadge } from '@/features/landing-page/lib/types/product';

export const PRODUCT_BADGE_VARIANT_CLASSES: Record<IProductBadge['variant'], string> = {
  hot: 'bg-maroon-50 text-maroon-600',
  outOfStock: 'bg-red-600 text-soft-pink-50',
  default: 'bg-maroon-50 text-maroon-600',
};
