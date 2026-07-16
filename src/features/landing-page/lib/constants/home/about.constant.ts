import type { IAboutFeature, IAboutImage } from '@/features/landing-page/lib/types/home/about';

const ABOUT_IMAGE_BASE_PATH = '/assets/images/home/about';

/**
 * The three photos composing the About collage, in render order:
 * the tall hero shot, the circular top-right shot, and the shorter bottom-right shot.
 */
export const ABOUT_IMAGES = {
  hero: {
    id: 'gift-unboxing',
    imageUrl: `${ABOUT_IMAGE_BASE_PATH}/gift-unboxing.png`,
    altEn: 'A hand lifting the ribbon off a lilac round gift box',
    altAr: 'يد ترفع الشريط عن علبة هدية دائرية بلون أرجواني',
  },
  circle: {
    id: 'wrapped-gifts',
    imageUrl: `${ABOUT_IMAGE_BASE_PATH}/wrapped-gifts.png`,
    altEn: 'Kraft-paper gifts tied with orange ribbon on a confetti backdrop',
    altAr: 'هدايا مغلفة بورق كرافت ومربوطة بشريط برتقالي على خلفية من القصاصات الملونة',
  },
  wide: {
    id: 'balloon-giftbox',
    imageUrl: `${ABOUT_IMAGE_BASE_PATH}/balloon-giftbox.png`,
    altEn: 'A gift box releasing pastel balloons on a teal background',
    altAr: 'علبة هدية تطلق بالونات بألوان الباستيل على خلفية فيروزية',
  },
} satisfies Record<string, IAboutImage>;

/** Selling points shown with a checkmark; labels live under `home.about.features`. */
export const ABOUT_FEATURES: IAboutFeature[] = [
  { id: 'competitive-prices', key: 'competitivePrices' },
  { id: 'premium-quality', key: 'premiumQuality' },
  { id: 'perfect-occasion', key: 'perfectOccasion' },
  { id: 'fast-delivery', key: 'fastDelivery' },
];
