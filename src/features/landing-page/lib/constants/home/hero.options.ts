export const HERO_IMAGE_OPTIONS = {
  CAROUSEL: {
    NEIGHBOR_DISTANCE: 1,
    LCP_SLIDE_INDEX: 0,
    SIZES: '(min-width: 1024px) 75vw, 100vw',
    IMAGE: {
      LCP: { fetchPriority: 'high', loading: 'eager' },
      DEFAULT: { fetchPriority: 'auto', loading: 'lazy' },
    },
  },
  BANNER_CARD: {
    SIZES: '(min-width: 1024px) 25vw, 100vw',
    IMAGE: { fetchPriority: 'low', loading: 'lazy' },
  },
  OCCASION: {
    SIZES: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
    IMAGE: { fetchPriority: 'auto', loading: 'lazy' },
  },
} as const;
