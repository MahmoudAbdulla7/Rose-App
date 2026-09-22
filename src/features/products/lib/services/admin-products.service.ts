import { toProductSearchParams } from '@/features/products/lib/utils/filter.utils';
import { routing } from '@/i18n/routing';
import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import { getProducts } from '@/shared/lib/apis/products/product.api';
import type { IProduct, IProductResponse } from '@/shared/lib/types/product';
import { pickData } from '@/shared/lib/utils/pick-data.utils';

type GetFilteredProductsParams = {
    searchParams?: ISearchParams;
    options?: { locale: string };
};

export type FilteredProductsResult = {
    products: IProduct[];
    metadata: IPaginatedData<IProduct>['metadata'];
};

export async function getAdminProducts({
    searchParams = {},
    options = { locale: routing.defaultLocale },
}: GetFilteredProductsParams): Promise<FilteredProductsResult> {
    const productSearchParams = {
        limit: PRODUCTS_OPTIONS.PRODUCT_PAGE_LIMIT.toString(),
        ...toProductSearchParams(searchParams),
    };

    const response = await getProducts(productSearchParams, { locale: options.locale });

    if (!response?.status) {
        throw new Error(response?.message ?? 'Failed to load products');
    }

    const successResponse = response as Extract<IProductResponse, { status: true }>;

    return {
        products: pickData<IProduct>(successResponse),
        metadata: successResponse.payload.metadata,
    };
}