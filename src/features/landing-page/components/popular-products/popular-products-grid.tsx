import { getLocale, getTranslations } from 'next-intl/server';

import ProductCard from '@/features/landing-page/components/product/product-card';
import { getPopularProducts } from '@/features/landing-page/lib/services/popular-products.service';
import EmptyState from '@/shared/components/empty-state';
import { isMobileDevice } from '@/shared/lib/utils/device.utils';

export interface IPopularProductsGridProps {
  searchParams?: ISearchParams;
}

export default async function PopularProductsGrid({
  searchParams = {},
}: IPopularProductsGridProps) {
  const t = await getTranslations('product.popularProducts');
  const locale = await getLocale();
  const isMobile = await isMobileDevice();

  const rawOccasion = searchParams.occasion;
  const occasionId = Array.isArray(rawOccasion) ? rawOccasion[0] : rawOccasion;

  const products = await getPopularProducts({
    searchParams: occasionId ? { occasionId } : {},
    options: { locale, isMobile },
  });
  const hasProducts = Boolean(products?.length);

  if (!hasProducts) {
    return <EmptyState title={t('emptyState.title')} subtitle={t('emptyState.description')} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 self-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard className="w-full min-w-58 md:min-w-70" key={product.id} product={product} />
      ))}
    </div>
  );
}
