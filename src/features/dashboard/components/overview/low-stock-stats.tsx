import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

import { Separator } from '@/shared/ui/separator';
import { LowStockProduct } from '../../lib/types/stats';

type LowStockStatsProps = {
  products?: LowStockProduct[];
};

export default function LowStockStats({ products = [] }: LowStockStatsProps) {
  const t = useTranslations('dashboard.overview.lists');

  return (
    <div className="bg-ds-plain flex h-110.75 flex-col rounded-3xl p-6">
      {/* Title */}
      <h2 className="mb-6 text-2xl font-semibold">{t('lowStockProducts')}</h2>

      <div className="scrollbar-thumb-ds-text-subtle flex min-h-0 flex-1 scrollbar-thin flex-col gap-1.5 overflow-y-auto pe-1">
        {/* Item */}
        {products.map((product) => (
          <Fragment key={product.id}>
            <div className="flex items-center justify-between gap-4">
              {/* Title */}
              <span className="min-w-0 truncate">{product.title}</span>

              {/* Count */}
              <span
                className={`shrink-0 text-sm font-medium ${product.stock < 5 ? 'text-ds-danger' : ''}`}
              >
                {product.stock} {product.stock === 1 ? t('product') : t('products')}
              </span>
            </div>

            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
