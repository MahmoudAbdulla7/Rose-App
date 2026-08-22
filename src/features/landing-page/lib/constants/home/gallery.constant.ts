import type { IGalleryImage } from '@/features/landing-page/lib/types/home/gallery';

const GALLERY_IMAGE_BASE_PATH = '/assets/images/home/gallery';

export const GALLERY_COLUMNS: IGalleryImage[][] = [
  [
    {
      id: 'occasion-gift-tags',
      imageUrl: `${GALLERY_IMAGE_BASE_PATH}/occasion-gift-tags.webp`,
      altEn: 'Burgundy gift boxes tagged for weddings, birthdays, anniversaries and graduations',
      altAr: 'علب هدايا عنابية موسومة للأعراس وأعياد الميلاد والذكرى السنوية والتخرج',
      aspect: '418/617',
    },
    {
      id: 'roses-chocolate-heart',
      imageUrl: `${GALLERY_IMAGE_BASE_PATH}/roses-chocolate-heart.webp`,
      altEn: 'Pink roses beside a heart-shaped box of chocolates',
      altAr: 'ورود وردية بجانب علبة شوكولاتة على شكل قلب',
      aspect: '418/406',
    },
  ],
  [
    {
      id: 'wedding-rings-gift',
      imageUrl: `${GALLERY_IMAGE_BASE_PATH}/wedding-rings-gift.webp`,
      altEn: 'Red gift boxes with gold wedding rings, hearts and white roses',
      altAr: 'علب هدايا حمراء مع خواتم زفاف ذهبية وقلوب وورود بيضاء',
      aspect: '419/411',
    },
    {
      id: 'engagement-ring-daisies',
      imageUrl: `${GALLERY_IMAGE_BASE_PATH}/engagement-ring-daisies.webp`,
      altEn: 'Gold engagement ring in a box surrounded by roses and daisies',
      altAr: 'خاتم خطوبة ذهبي داخل علبة محاط بالورود وزهور الأقحوان',
      aspect: '419/611',
    },
  ],
  [
    {
      id: 'engagement-ring-roses',
      imageUrl: `${GALLERY_IMAGE_BASE_PATH}/engagement-ring-roses.webp`,
      altEn: 'Gold engagement ring in a box nestled within a bed of roses',
      altAr: 'خاتم خطوبة ذهبي داخل علبة موضوعة وسط فراش من الورود',
      aspect: '418/411',
    },
    {
      id: 'engagement-card-gifts',
      imageUrl: `${GALLERY_IMAGE_BASE_PATH}/engagement-card-gifts.webp`,
      altEn: 'Engagement congratulations card with gift boxes, a ring and a candle',
      altAr: 'بطاقة تهنئة بالخطوبة مع علب هدايا وخاتم وشمعة',
      aspect: '418/611',
    },
  ],
];
