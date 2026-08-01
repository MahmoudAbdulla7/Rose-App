import ProductsContentPagination from './pagination';
import ProductsGrid from './products-grid';

type ProductsContentProps = {
  searchParams?: ISearchParams;
};

export default function ProductsContent({ searchParams = {} }: ProductsContentProps) {
  return (
    <>
      <ProductsGrid searchParams={searchParams} />
      <ProductsContentPagination searchParams={searchParams} />
    </>
  );
}
