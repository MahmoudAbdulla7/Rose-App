import PaymentMethodSection from '@/features/checkout/components/payment-method-section';
import { Button } from '@/shared/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <section className="container flex flex-col gap-6 py-10 lg:py-16">
      <header className="flex gap-4">
        <Button className="flex h-10 gap-1 border-none p-2.5" variant="subtle" size="lg">
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <h1 className="text-3xl font-semibold">Payment Method</h1>
      </header>

      <PaymentMethodSection />
    </section>
  );
}
