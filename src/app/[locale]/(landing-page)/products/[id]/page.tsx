import ProductDetails from '@/features/products/components/product-details/product-details';
import RelatedProductsSection from '@/features/products/components/related-products/related-products-section';
import ProductDetailPageSkeleton from '@/features/products/skeletons/product-detail-page.skeleton';
import RelatedProductsSectionSkeleton from '@/features/products/skeletons/related-products/related-products-section.skeleton';
import { getProduct } from '@/shared/lib/apis/product/product.api';
import type { Metadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const product = await getProduct(id, { locale });

  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.cover ? [product.cover] : undefined,
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  return (
    <section className="mt-10 lg:mt-17">
      <Suspense fallback={<ProductDetailPageSkeleton />}>
        <ProductDetailContent params={params} />
      </Suspense>
    </section>
  );
}

async function ProductDetailContent({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <ProductDetails id={id} />
      <div className="container mt-12 lg:mt-16">
        <Suspense fallback={<RelatedProductsSectionSkeleton />}>
          <RelatedProductsSection currentProductId={id} />
        </Suspense>
      </div>
    </>
  );
}
