import { getTranslations } from 'next-intl/server';

import { getProducts } from '@/shared/lib/apis/products/product.api';
import type { IProduct } from '@/shared/lib/types/product';
import ProductsCarouselSection from './products-carousel-section';

type RelatedProductsSectionProps = {
  currentProductId: string;
  currentCategoryId?: string;
  currentSubCategoryId?: string | null;
};

const RELATED_PRODUCTS_LIMIT = 8;

export default async function RelatedProductsSection({
  currentProductId,
  currentCategoryId,
  currentSubCategoryId,
}: RelatedProductsSectionProps) {
  const t = await getTranslations('product');

  const searchParams: ISearchParams = {
    limit: (RELATED_PRODUCTS_LIMIT + 1).toString(),
  };

  if (currentCategoryId) {
    searchParams.categoryId = currentCategoryId;
  }

  if (currentSubCategoryId) {
    searchParams.subCategoryId = currentSubCategoryId;
  }

  const response = await getProducts(searchParams);

  if (!response?.status) {
    return null;
  }

  const relatedProducts = response.payload.data
    .filter((product: IProduct) => product.id !== currentProductId)
    .slice(0, RELATED_PRODUCTS_LIMIT);

  if (!relatedProducts.length) {
    return null;
  }

  return (
    <ProductsCarouselSection
      title={t('relatedProducts.title')}
      products={relatedProducts}
      emptyState={null}
      className="my-12 lg:mt-16"
    />
  );
}
