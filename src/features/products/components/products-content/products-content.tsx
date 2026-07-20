import ProductsContentPagination from './pagination';
import ProductsGrid from './products-grid';

export default function ProductsContent() {
  return (
    <>
      <ProductsGrid />
      <ProductsContentPagination />
    </>
  );
}
