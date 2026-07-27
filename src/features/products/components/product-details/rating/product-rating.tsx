import React from 'react';
import GeneralRatingSection from './general-rating-section';
import ProductReviewsSection from './product-reviews-section';

export default function ProductRating() {
  return (
    <section>
      <GeneralRatingSection />
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <ProductReviewsSection />
        </div>
      </div>
    </section>
  );
}
