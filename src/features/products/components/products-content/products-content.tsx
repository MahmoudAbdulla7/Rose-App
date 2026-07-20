import ProductsContentPagination from './pagination';
import ProductsGrid from './products-grid';

type ProductsContentProps = {
  searchParams?: ISearchParams;
};

export default function ProductsContent(_props: ProductsContentProps) {
  return (
    <>
      <ProductsGrid />
      <ProductsContentPagination />
    </>
  );
}
