import type { IPartnerLogo } from '@/features/landing-page/lib/types/home/partner';

const PARTNER_IMAGE_BASE_PATH = '/assets/images/home/partner';

export const PARTNER_LOGOS: IPartnerLogo[] = [
  {
    id: 'coconut',
    imageUrl: `${PARTNER_IMAGE_BASE_PATH}/coconut.png`,
    altEn: 'Coconut Cosmetics logo',
    altAr: 'شعار شركة كوكونت للتجميل',
  },
  {
    id: 'ginyard',
    imageUrl: `${PARTNER_IMAGE_BASE_PATH}/ginyard.png`,
    altEn: 'Ginyard logo',
    altAr: 'شعار شركة جينيارد',
  },
  {
    id: 'ingoude-company',
    imageUrl: `${PARTNER_IMAGE_BASE_PATH}/ingoude-company.png`,
    altEn: 'Ingoude Company logo',
    altAr: 'شعار شركة إنغود',
  },
  {
    id: 'velvet',
    imageUrl: `${PARTNER_IMAGE_BASE_PATH}/velvet.png`,
    altEn: 'Velvet Cosmetics logo',
    altAr: 'شعار شركة فيلفيت للتجميل',
  },
  {
    id: 'ingoude',
    imageUrl: `${PARTNER_IMAGE_BASE_PATH}/ingoude.png`,
    altEn: 'Ingoude logo',
    altAr: 'شعار إنغود',
  },
  {
    id: 'habus',
    imageUrl: `${PARTNER_IMAGE_BASE_PATH}/habus.png`,
    altEn: 'Habus Furniture logo',
    altAr: 'شعار هابوس للأثاث',
  },
];
