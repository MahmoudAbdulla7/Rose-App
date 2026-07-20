import ProductsContent from '@/features/products/components/products-content/products-content';
import Filters from '@/features/products/components/sidebar/filters';

export default function ProductsPage() {
  return (
    <main className="flex-raw container flex gap-6.25 overflow-hidden py-6">
      <section className="w-1/4 rounded-lg">
        <Filters />
      </section>
      <section className="w-3/4 rounded-lg">
        <ProductsContent />
      </section>
    </main>
  );
}
