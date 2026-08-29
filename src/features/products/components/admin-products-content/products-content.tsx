import { getFilteredProducts } from '../../lib/services/products.service';
import { getLocale } from 'next-intl/server';
import ProductsTableContent from './products-table';
import ProductsSearch from './products-search';
import Pagination from '@/shared/components/pagination';
import ProductsHeader from './products-header';

type ProductsContentProps = {
    searchParams: Promise<ISearchParams>;
};

export default async function AdminProductsPageContent({ searchParams }: ProductsContentProps) {
    const locale = await getLocale();
    const resolvedSearchParams = await searchParams;

    const { products, metadata } = await getFilteredProducts({
        searchParams: resolvedSearchParams,
        options: { locale },
    });

    return (
        <>
            <ProductsHeader />
            <ProductsSearch />
            <ProductsTableContent products={products} />
            <Pagination totalPages={metadata.totalPages} />
        </>
    );
}