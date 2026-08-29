import Pagination from '@/shared/components/pagination';

type CategoriesPaginationProps = {
  metadata: IPaginatedData<unknown>['metadata'];
};

export default function CategoriesPagination({ metadata }: CategoriesPaginationProps) {
  return (
    <div className="pt-2">
      <Pagination totalPages={metadata.totalPages} />
    </div>
  );
}
