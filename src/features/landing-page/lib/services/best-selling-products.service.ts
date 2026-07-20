import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import { getProducts } from '@/shared/lib/apis/products/product.api';
import { pickData } from '@/shared/lib/utils/pick-data.utils';
import type { IProduct, IProductResponse } from '@/shared/lib/types/product';
import { cacheLife, cacheTag } from 'next/cache';

type GetBestSellingProductsParams = {
  searchParams: ISearchParams;
  options: { locale: string; isMobile: boolean };
};

export async function getBestSellingProducts({
  searchParams,
  options,
}: GetBestSellingProductsParams) {
  'use cache';
  cacheLife(PRODUCTS_OPTIONS.CACHE_LIFE);
  cacheTag(...PRODUCTS_OPTIONS.BEST_SELLING_TAGS);

  const response = await getProducts(
    { limit: PRODUCTS_OPTIONS.BEST_SELLING_LIMIT.toString(), ...searchParams },
    { locale: options.locale },
  );

  if (!response?.status) {
    throw new Error(response?.message ?? 'Failed to load products');
  }

  return pickData<IProduct>(response as IProductResponse);
}
