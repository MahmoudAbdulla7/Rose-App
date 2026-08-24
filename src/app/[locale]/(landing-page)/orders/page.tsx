'use client';

import OrderCard from '@/features/orders/components/order-card';
import OrdersEmptyState from '@/features/orders/components/orders-empty-state';
import OrdersPagination from '@/features/orders/components/orders-pagination';
import { useOrders } from '@/shared/hooks/use-orders.hook';
import { useState } from 'react';

const LIMIT = 10;

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const { orders, metadata, isLoading } = useOrders({ page: String(page), limit: String(LIMIT) });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Orders</h1>

      {isLoading ? (
        <p className="text-ds-text-muted text-sm">Loading orders...</p>
      ) : orders.length === 0 ? (
        <OrdersEmptyState />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {metadata && (
        <div className="mt-6">
          <OrdersPagination page={metadata.page} totalPages={metadata.totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}