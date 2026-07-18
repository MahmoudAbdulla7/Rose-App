import type { AutoplayOptionsType } from 'embla-carousel-autoplay';

/** Autoplay configuration. */
export const BEST_SELLING_CAROUSEL_AUTOPLAY_CONFIG = {
  delay: 4000, // 4 seconds
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  playOnInit: true,
} as AutoplayOptionsType;

/** How many leading cards get `priority` image loading (above-the-fold). */
const BEST_SELLING_CAROUSEL_IMAGE_PRIORITY_COUNT = 3;
export function isBestSellingCarouselImagePriority(index: number): boolean {
  return index < BEST_SELLING_CAROUSEL_IMAGE_PRIORITY_COUNT;
}
