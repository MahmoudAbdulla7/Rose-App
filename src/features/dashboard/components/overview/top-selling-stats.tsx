import { useTranslations } from 'next-intl';

import { TopSellingProduct } from '../../lib/types/stats';

type TopSellingStatsProps = {
  products?: TopSellingProduct[];
  currency?: string;
};

const rankBackgrounds = [
  'bg-[linear-gradient(90deg,rgba(223,172,22,0.25)_0%,rgba(223,172,22,0.1)_100%)] dark:bg-[linear-gradient(90deg,rgba(223,172,22,0.22)_0%,rgba(223,172,22,0.06)_100%)]',
  'bg-[linear-gradient(90deg,rgba(117,127,149,0.25)_0%,rgba(117,127,149,0.1)_100%)] dark:bg-[linear-gradient(90deg,rgba(117,127,149,0.22)_0%,rgba(117,127,149,0.06)_100%)]',
  'bg-[linear-gradient(90deg,rgba(145,68,0,0.25)_0%,rgba(145,68,0,0.1)_100%)] dark:bg-[linear-gradient(90deg,rgba(145,68,0,0.22)_0%,rgba(145,68,0,0.06)_100%)]',
];

export default function TopSellingStats({ products = [], currency }: TopSellingStatsProps) {
  const t = useTranslations('dashboard.overview.lists');

  return (
    <div className="bg-ds-plain flex h-110.75 flex-col rounded-3xl p-6">
      {/* Title */}
      <h2 className="mb-6 text-2xl font-semibold">{t('topSellingProducts')}</h2>

      <div className="scrollbar-thumb-ds-text-subtle flex min-h-0 flex-1 scrollbar-thin flex-col gap-2.25 overflow-y-auto pe-1">
        {/* Item */}
        {products.map((product, index) => (
          <div
            key={product.productId}
            className={`flex items-center justify-between gap-4 rounded-sm px-2.5 py-1.5 ${
              rankBackgrounds[index] ?? 'bg-ds-muted'
            }`}
          >
            <p className="min-w-0 truncate font-semibold">
              {/* Title */}
              {product.title}

              {/* Price */}
              <span className="text-xs font-normal">
                {' '}
                ({product.unitPrice} {currency})
              </span>
            </p>

            {/* Sales */}
            <p className="shrink-0 font-bold">
              {product.totalSales}{' '}
              <span className="font-medium">
                {product.totalSales === 1 ? t('sale') : t('sales')}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
