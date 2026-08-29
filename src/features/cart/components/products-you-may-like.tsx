import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import SuggestedProductsCarousel from '@/features/cart/components/suggested-products-carousel';
import { renderProductCarouselItem } from '@/features/products/components/related-products/products-carousel-section';
import RelatedProductsSectionSkeleton from '@/features/products/skeletons/related-products/related-products-section.skeleton';
import { getProducts } from '@/shared/lib/apis/products/product.api';
import { PRODUCT_SORT_BY, PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';

export default function ProductsYouMayLike() {
  return (
    <Suspense fallback={<RelatedProductsSectionSkeleton />}>
      <ProductsYouMayLikeContent />
    </Suspense>
  );
}

async function ProductsYouMayLikeContent() {
  const t = await getTranslations('cart');

  const response = await getProducts({
    limit: PRODUCTS_OPTIONS.SUGGESTED_FETCH_LIMIT.toString(),
    sortBy: PRODUCT_SORT_BY.MOST_POPULAR,
  });

  const items = (response?.status ? response.payload.data : []).map((product) => ({
    productId: product.id,
    node: renderProductCarouselItem(product),
  }));

  return (
    <SuggestedProductsCarousel
      title={t('productsYouMayLike')}
      items={items}
      limit={PRODUCTS_OPTIONS.SUGGESTED_LIMIT}
    />
  );
}
