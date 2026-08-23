import ProductCard from '@/features/landing-page/components/product/product-card';
import EmptyState from '@/shared/components/empty-state';
import type { IProduct } from '@/shared/lib/types/product';
import { getTranslations } from 'next-intl/server';

type ProductsGridProps = {
  products: IProduct[];
};

export default async function ProductsGrid({ products }: ProductsGridProps) {
  const t = await getTranslations('common');

  if (!products.length) {
    return (
      <EmptyState
        className="h-full flex-1"
        title={t('emptyState.title')}
        subtitle={t('emptyState.description', { entity: t('entities.products') })}
      />
    );
  }

  return (
    <section aria-labelledby="products-grid-title">
      <h2 id="products-grid-title" className="sr-only">
        {t('productsGridLabel')}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} className="w-full min-w-0" />
        ))}
      </div>
    </section>
  );
}
