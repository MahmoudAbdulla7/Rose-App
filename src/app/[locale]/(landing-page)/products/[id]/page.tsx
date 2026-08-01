import ProductDetails from '@/features/products/components/product-details/product-details';
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
  const { id } = await params;

  return (
    <section className="mt-10 lg:mt-17">
      <ProductDetails id={id} />
    </section>
  );
}
