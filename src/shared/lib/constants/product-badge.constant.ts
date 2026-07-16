export type ProductBadgeVariant = 'hot' | 'outOfStock' | 'default';

export const PRODUCT_BADGE_VARIANT_CLASSES: Record<ProductBadgeVariant, string> = {
  hot: 'bg-maroon-50 text-maroon-600',
  outOfStock: 'bg-red-600 text-soft-pink-50',
  default: 'bg-zinc-100 text-zinc-700',
};
