import type { ITestimonial } from '@/features/landing-page/lib/types/home/testimonials';

const TESTIMONIAL_IMAGE_BASE_PATH = '/assets/images/home/testimonials';

/** Highest score a testimonial can earn; drives how many stars the rating renders. */
export const TESTIMONIAL_MAX_RATING = 5;

/** Customer reviews shown as overlapping avatar cards in the Testimonials band. */
export const TESTIMONIALS: ITestimonial[] = [
  {
    id: '1',
    imageUrl: `${TESTIMONIAL_IMAGE_BASE_PATH}/jake-miller.png`,
    nameEn: 'Jake Miller',
    nameAr: 'جيك ميلر',
    commentEn:
      "I've been ordering from this flower shop for years and they never disappoint. The quality and service are exceptional!",
    commentAr: 'أطلب من متجر الزهور هذا منذ سنوات ولم يخيّب ظني قط. الجودة والخدمة استثنائية!',
    rating: 5,
    date: '2025-01-12',
  },
  {
    id: '2',
    imageUrl: `${TESTIMONIAL_IMAGE_BASE_PATH}/tyler-brooks.png`,
    nameEn: 'Tyler Brooks',
    nameAr: 'تايلر بروكس',
    commentEn:
      "Customer service is top-notch and the flowers last longer than any others I've bought. Highly recommend!",
    commentAr: 'خدمة العملاء ممتازة والزهور تدوم أطول من أي زهور اشتريتها من قبل. أنصح به بشدة!',
    rating: 5,
    date: '2025-01-10',
  },
  {
    id: '3',
    imageUrl: `${TESTIMONIAL_IMAGE_BASE_PATH}/max-turner.png`,
    nameEn: 'Max Turner',
    nameAr: 'ماكس تيرنر',
    commentEn:
      'The team truly cares about every order. I always feel confident when I buy flowers from here, and the checkout was super smooth.',
    commentAr:
      'الفريق يهتم حقًا بكل طلب. أشعر دائمًا بالثقة عند شراء الزهور من هنا، وكانت عملية الدفع سلسة للغاية.',
    rating: 4,
    date: '2025-01-08',
  },
  {
    id: '4',
    imageUrl: `${TESTIMONIAL_IMAGE_BASE_PATH}/jake-miller.png`,
    nameEn: 'Jake Miller',
    nameAr: 'جيك ميلر',
    commentEn:
      "I've been ordering from this flower shop for years and they never disappoint. The quality and service are exceptional!",
    commentAr: 'أطلب من متجر الزهور هذا منذ سنوات ولم يخيّب ظني قط. الجودة والخدمة استثنائية!',
    rating: 5,
    date: '2025-01-12',
  },
  {
    id: '5',
    imageUrl: `${TESTIMONIAL_IMAGE_BASE_PATH}/tyler-brooks.png`,
    nameEn: 'Tyler Brooks',
    nameAr: 'تايلر بروكس',
    commentEn:
      "Customer service is top-notch and the flowers last longer than any others I've bought. Highly recommend!",
    commentAr: 'خدمة العملاء ممتازة والزهور تدوم أطول من أي زهور اشتريتها من قبل. أنصح به بشدة!',
    rating: 5,
    date: '2025-01-10',
  },
  {
    id: '6',
    imageUrl: `${TESTIMONIAL_IMAGE_BASE_PATH}/max-turner.png`,
    nameEn: 'Max Turner',
    nameAr: 'ماكس تيرنر',
    commentEn:
      'The team truly cares about every order. I always feel confident when I buy flowers from here, and the checkout was super smooth.',
    commentAr:
      'الفريق يهتم حقًا بكل طلب. أشعر دائمًا بالثقة عند شراء الزهور من هنا، وكانت عملية الدفع سلسة للغاية.',
    rating: 4,
    date: '2025-01-08',
  },
];
