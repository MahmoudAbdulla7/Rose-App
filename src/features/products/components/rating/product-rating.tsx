import type { IReview } from '@/shared/lib/types/single-product';
import { Separator } from '@/shared/ui/separator';
import { getTranslations } from 'next-intl/server';

import SectionHeading from '@/features/landing-page/components/home/section-heading';

import ReviewForm from '../review/review-form';
import GeneralRatingSection from './general-rating-section';
import ProductReviewsSection from './product-reviews-section';

type ProductRatingProps = {
  productId: string;
  rating: number;
  ratingsCount: number;
  reviews: IReview[];
};

export default async function ProductRating({
  productId,
  rating,
  ratingsCount,
  reviews,
}: ProductRatingProps) {
  const t = await getTranslations('product.productDetails.reviews');

  return (
    <section className="flex flex-col gap-4" aria-labelledby="product-reviews-title">
      <SectionHeading id="product-reviews-title">{t('title')}</SectionHeading>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
        <ProductReviewsSection reviews={reviews} className="min-w-0 flex-1" />
        <Separator
          orientation="vertical"
          className="hidden bg-zinc-200 lg:block dark:bg-zinc-700"
        />
        <ReviewForm productId={productId} className="w-full lg:w-[484px] lg:shrink-0" />
      </div>

      <Separator className="bg-zinc-200 dark:bg-zinc-700" />

      <GeneralRatingSection rating={rating} ratingsCount={ratingsCount} />
    </section>
  );
}
