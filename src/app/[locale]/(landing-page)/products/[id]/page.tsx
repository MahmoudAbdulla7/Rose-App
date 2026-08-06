import ProductDetails from '@/features/products/components/product-details/product-details';
import RelatedProductsSection from '@/features/products/components/related-products/related-products-section';
import { getProduct } from '@/shared/lib/apis/product/product.api';
import type { Metadata } from 'next';

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

export default async function ProductDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const product = await getProduct(id, { locale });

  return (
    <section className="mt-10 lg:mt-17">
      <ProductDetails id={id} />
      {/* <ReviewForm productId={id} /> */}
      <div className="container mt-12 lg:mt-16">
        <RelatedProductsSection
          currentProductId={id}
          currentCategoryId={product?.category?.id}
          currentSubCategoryId={product?.subCategory?.id ?? null}
        />
      </div>
    </section>
  );
}
