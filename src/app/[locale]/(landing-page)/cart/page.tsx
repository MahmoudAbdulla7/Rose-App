'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import CartHeader from '@/features/cart/components/cart-header';
import CartItemCard, { type CartItem } from '@/features/cart/components/cart-item-card';
import CartSkeleton from '@/features/cart/components/cart-skeleton';
import ContinueShoppingButton from '@/features/cart/components/continue-shopping-button';
import EmptyCartState from '@/features/cart/components/empty-cart-state';
import {
  useCart,
  useClearCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from '@/features/cart/hooks/use-cart';
import type { ICartItem } from '@/shared/lib/types/cart';
import { getProductDisplayPrice } from '@/shared/lib/utils/product-price.utils';

// Map API cart line → UI card shape
function mapCartItem(item: ICartItem): CartItem {
  const { price } = getProductDisplayPrice({
    price: item.product.price,
    discountType: item.product.discountType,
    discountValue: item.product.discountValue,
  });

  const stock = Number(item.product.stock);

  return {
    id: item.id,
    productId: item.productId,
    title: item.product.title,
    image: item.product.cover,
    rating: Number(item.product.rating),
    ratingsCount: Number(item.product.ratings),
    unitPrice: price,
    quantity: item.quantity,
    maxStock: stock,
    outOfStock: stock <= 0,
  };
}

export default function CartPage() {
  // Translation
  const t = useTranslations('cart');

  // Auth — needed so we don't flash empty state while the session is resolving
  const { status: sessionStatus } = useSession();

  // Query & mutations
  const { data, isLoading, isPending, isFetching, isError } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();
  const clearCart = useClearCart();

  // Derived UI state
  const hasResolvedCart =
    data != null && data.status === true && Array.isArray(data.payload?.cartItems);
  const showSkeleton =
    sessionStatus === 'loading' || isLoading || isPending || (isFetching && !hasResolvedCart);

  const hasLoadError = !showSkeleton && (isError || (data != null && data.status === false));
  const cartItems = hasResolvedCart ? data.payload.cartItems.map(mapCartItem) : [];

  // Handlers — always pass cartItems[].id (not productId)
  const handleQuantityChange = (id: string, quantity: number) => {
    if (!id || quantity < 1) return;
    updateCartItem.mutate({ id, quantity });
  };

  const handleRemove = (id: string) => {
    if (!id) return;
    removeCartItem.mutate(id);
  };

  const handleClearCart = () => {
    clearCart.mutate();
  };

  return (
    <div className="container py-6 sm:py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:gap-10">
        {/* Left column — cart items */}
        <section className="flex min-w-0 flex-col gap-6">
          <CartHeader itemCount={cartItems.length} onClearCart={handleClearCart} />

          {showSkeleton ? (
            <CartSkeleton />
          ) : hasLoadError ? (
            <p role="alert" className="text-ds-danger text-sm">
              {t('loadError')}
            </p>
          ) : cartItems.length === 0 ? (
            <EmptyCartState />
          ) : (
            <>
              <ul className="border-ds-border-muted divide-ds-border-muted flex list-none flex-col divide-y rounded-2xl border px-4">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <CartItemCard
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemove}
                      isUpdating={
                        updateCartItem.isPending && updateCartItem.variables?.id === item.id
                      }
                    />
                  </li>
                ))}
              </ul>

              <ContinueShoppingButton />

              {/* TODO: mount <ProductsYouMayLike /> here (S5-02) */}
              <div className="border-ds-border-muted bg-ds-subtle text-ds-text-muted flex min-h-48 items-center justify-center rounded-2xl border border-dashed p-6 text-sm">
                Products You May Like
              </div>
            </>
          )}
        </section>

        {/* Right column — order summary slot */}
        <aside className="flex min-w-0 flex-col gap-6">
          {/* TODO: mount <OrderSummary /> here (S5-02) */}
          <div className="border-ds-border-muted bg-ds-subtle text-ds-text-muted flex min-h-64 items-center justify-center rounded-2xl border border-dashed p-6 text-sm">
            Order Summary
          </div>
        </aside>
      </div>
    </div>
  );
}
