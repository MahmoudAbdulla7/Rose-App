import type { IProduct } from '@/features/landing-page/lib/types/product';

export const PRODUCT_CARD_DUMMY_DATA: IProduct = {
  id: 'moko-chocolate-set-esperance',
  nameEn: 'Moko Chocolate Set | Esperance....',
  nameAr: 'مجموعة موكو الشوكولاته | اسبرانس...',
  imageUrl: '/assets/images/product-card-cover.png',
  price: 250,
  originalPrice: 350,
  currency: 'EGP',
  rating: 4,
  maxRating: 5,
  outOfStock: true,
  badges: [
    { labelAr: 'ساخن', labelEn: 'Hot', variant: 'hot' },
    { labelAr: 'غير متوفر', labelEn: 'Out of Stock', variant: 'outOfStock' },
  ],
};
