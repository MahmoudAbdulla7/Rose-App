import type { IReview } from '@/shared/lib/types/single-product';

import ReviewForm from '../review/review-form';
import GeneralRatingSection from './general-rating-section';
import ProductReviewsSection from './product-reviews-section';

type ProductRatingProps = {
  productId: string;
  rating: number;
  ratingsCount: number;
  reviews?: IReview[];
};

export default function ProductRating({
  productId,
  rating,
  ratingsCount,
  reviews,
}: ProductRatingProps) {
  return (
    <section className="my-12">
      <GeneralRatingSection rating={rating} ratingsCount={ratingsCount} />
      <div className="grid-cols-3 lg:grid">
        <div className="col-span-2">
          <ProductReviewsSection reviews={reviews} />
        </div>
        <div className="col-span-1">
          <ReviewForm productId={productId} />
        </div>
      </div>
    </section>
  );
}
