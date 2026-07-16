import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import { getProducts } from '@/shared/lib/apis/products/product.api';
import { pickData } from '@/shared/lib/utils/pick-data.utils';
import type { IProduct, IProductResponse } from '@/shared/lib/types/product';
import { cacheLife, cacheTag } from 'next/cache';

type GetProductsParams = {
  searchParams: ISearchParams;
  options: { locale: string; isMobile: boolean };
};

export async function getBestSellingProducts({ searchParams, options }: GetProductsParams) {
  'use cache';
  cacheLife(PRODUCTS_OPTIONS.CACHE_LIFE);
  cacheTag(...PRODUCTS_OPTIONS.BEST_SELLING_TAGS);

  const response = await getProducts(
    { limit: PRODUCTS_OPTIONS.BEST_SELLING_LIMIT.toString(), ...searchParams },
    { locale: options.locale },
  );
  if (!response?.status) {
    return [];
  }
  return pickData<IProduct>(response as IProductResponse);
}

export async function getPopularProducts({ searchParams, options }: GetProductsParams) {
  'use cache';
  cacheLife(PRODUCTS_OPTIONS.CACHE_LIFE);
  cacheTag(...PRODUCTS_OPTIONS.POPULAR_PRODUCTS_TAGS);

  const limit = options.isMobile ? PRODUCTS_OPTIONS.MOBILE_LIMIT : PRODUCTS_OPTIONS.DESKTOP_LIMIT;

  const response = await getProducts(
    { limit: limit.toString(), ...searchParams },
    { locale: options.locale },
  );
  if (!response?.status) {
    return [];
  }
  return pickData<IProduct>(response as IProductResponse);
}
