import PaginationComponent from '@/shared/components/pagination';

type ProductsContentPaginationProps = {
  metadata: IPaginatedData<unknown>['metadata'];
};

export default function ProductsContentPagination({ metadata }: ProductsContentPaginationProps) {
  return (
    <div className="pt-2">
      <PaginationComponent totalPages={metadata.totalPages} />
    </div>
  );
}
