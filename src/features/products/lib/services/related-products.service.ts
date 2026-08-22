import { routing } from '@/i18n/routing';
import { getProduct } from '@/shared/lib/apis/product/product.api';
import { getProducts } from '@/shared/lib/apis/products/product.api';
import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import type { IProduct } from '@/shared/lib/types/product';
import { cacheLife, cacheTag } from 'next/cache';

const RELATED_PRODUCTS_LIMIT = 8;

type GetRelatedProductsParams = {
  currentProductId: string;
  options?: { locale: string };
};

export async function getRelatedProducts({
  currentProductId,
  options = { locale: routing.defaultLocale },
}: GetRelatedProductsParams): Promise<IProduct[]> {
  'use cache';
  cacheLife(PRODUCTS_OPTIONS.CACHE_LIFE);
  cacheTag(...PRODUCTS_OPTIONS.TAGS);

  const product = await getProduct(currentProductId, { locale: options.locale });

  const searchParams: ISearchParams = {
    limit: (RELATED_PRODUCTS_LIMIT + 1).toString(),
  };

  if (product?.category?.id) {
    searchParams.categoryId = product.category.id;
  }

  if (product?.subCategory?.id) {
    searchParams.subCategoryId = product.subCategory.id;
  }

  const response = await getProducts(searchParams, { locale: options.locale });

  if (!response?.status) {
    return [];
  }

  return response.payload.data
    .filter((productItem) => productItem.id !== currentProductId)
    .slice(0, RELATED_PRODUCTS_LIMIT);
}
