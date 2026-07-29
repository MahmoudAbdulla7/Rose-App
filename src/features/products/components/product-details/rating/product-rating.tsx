import type { IReview } from '@/shared/lib/types/single-product';

import GeneralRatingSection from './general-rating-section';
import ProductReviewsSection from './product-reviews-section';

type ProductRatingProps = {
  rating: number;
  ratingsCount: number;
  reviews: IReview[];
};

export default function ProductRating({ rating, ratingsCount, reviews }: ProductRatingProps) {
  return (
    <section className="my-12">
      <GeneralRatingSection rating={rating} ratingsCount={ratingsCount} />
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <ProductReviewsSection reviews={reviews} />
        </div>
      </div>
    </section>
  );
}
