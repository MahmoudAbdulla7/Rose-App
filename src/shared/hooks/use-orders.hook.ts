'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { fetchOrders } from '../lib/apis/orders/user-order-list.api';
import type { IOrder, IOrderSearchParams } from '../lib/types/orders';

export function useOrders(params: Partial<IOrderSearchParams> = {}) {
    const { status } = useSession();
    const isAuthenticated = status === 'authenticated';

    const { data: ordersData, ...queryState } = useQuery({
        queryKey: ['orders', params],
        queryFn: () => fetchOrders(params),
        enabled: isAuthenticated,
    });

    const orders: IOrder[] = ordersData?.status ? ordersData.payload.data : [];
    const metadata = ordersData?.status ? ordersData.payload.metadata : null;

    return { isAuthenticated, orders, metadata, ...queryState };
}