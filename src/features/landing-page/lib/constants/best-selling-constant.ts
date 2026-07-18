/** How many leading cards get `priority` image loading (above-the-fold). */
export const BEST_SELLING_CAROUSEL_IMAGE_PRIORITY_COUNT = 3;

export function isBestSellingCarouselImagePriority(index: number): boolean {
  return index < BEST_SELLING_CAROUSEL_IMAGE_PRIORITY_COUNT;
}
