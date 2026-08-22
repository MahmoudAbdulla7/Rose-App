import { getLocale, getTranslations } from 'next-intl/server';

import { getRelatedProducts } from '@/features/products/lib/services/related-products.service';
import ProductsCarouselSection from './products-carousel-section';

type RelatedProductsSectionProps = {
  currentProductId: string;
};

export default async function RelatedProductsSection({
  currentProductId,
}: RelatedProductsSectionProps) {
  const [t, locale] = await Promise.all([getTranslations('product'), getLocale()]);

  const relatedProducts = await getRelatedProducts({
    currentProductId,
    options: { locale },
  });

  if (!relatedProducts.length) {
    return null;
  }

  return (
    <ProductsCarouselSection
      title={t('relatedProducts.title')}
      products={relatedProducts}
      emptyState={null}
      className="my-12.5 lg:mb-42!"
    />
  );
}
