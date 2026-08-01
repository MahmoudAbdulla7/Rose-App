import Pagination from '@/shared/components/pagination';

type ProductsContentPaginationProps = {
  metadata: IPaginatedData<unknown>['metadata'];
};

export default function ProductsContentPagination({ metadata }: ProductsContentPaginationProps) {
  return (
    <div className="pt-2">
      <Pagination totalPages={metadata.totalPages} />
    </div>
  );
}
