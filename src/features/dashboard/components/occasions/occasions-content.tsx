import { Plus } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import OccasionsTable from './occasions-table';
import { Link } from '@/i18n/navigation';
import EmptyState from '@/shared/components/empty-state';
import Pagination from '@/shared/components/pagination';
import SearchFilter from '@/shared/components/search-filter';
import { getPaginatedOccasions } from '@/shared/lib/services/occasions.service';
import { Button } from '@/shared/ui/button';

type Props = {
  searchParams: Promise<ISearchParams>;
};

export default async function OccasionsContent({ searchParams }: Props) {
  // Translation
  const t = await getTranslations('dashboard.occasions');
  const tCommon = await getTranslations('common');
  const locale = await getLocale();

  // Data
  const { occasions, metadata } = await getPaginatedOccasions({
    searchParams: await searchParams,
    options: { locale },
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <section className="bg-ds-plain flex w-full flex-col gap-4.5 rounded-4xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-ds-text-plain text-xl font-semibold sm:text-2xl">{t('listTitle')}</h1>

          <Button
            size="xl"
            className="shrink-0 max-sm:w-11 max-sm:px-0"
            leftIcon={<Plus className="size-5.5" />}
            render={<Link href="/occasions/new" />}
            aria-label={t('add')}
          >
            <span className="max-sm:hidden">{t('add')}</span>
          </Button>
        </div>

        {/* Search */}
        <SearchFilter label={t('searchLabel')} />

        {/* Table */}
        {occasions.length > 0 && <OccasionsTable occasions={occasions} />}
        {occasions.length === 0 && (
          <EmptyState
            title={tCommon('emptyState.title')}
            subtitle={tCommon('emptyState.description', { entity: tCommon('entities.occasions') })}
          />
        )}
      </section>

      <Pagination totalPages={metadata.totalPages} />
    </div>
  );
}
