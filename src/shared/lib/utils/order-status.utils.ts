// shared/lib/utils/order-status.utils.ts
import type { TOrderStatus } from '@/shared/lib/types/orders';

type StatusDisplay = { label: string; variant: 'success' | 'info' | 'danger' | 'warning' | 'neutral' };

// Top-right simplified badge
export function getOrderStatusSummary(status: TOrderStatus): StatusDisplay {
    switch (status) {
        case 'DELIVERED':
            return { label: 'Done', variant: 'success' };
        case 'CANCELLED':
        case 'REFUNDED':
            return { label: 'Canceled', variant: 'danger' };
        case 'PENDING':
        case 'CONFIRMED':
        case 'PROCESSING':
        case 'SHIPPED':
        default:
            return { label: 'In Progress', variant: 'info' };
    }
}

// Detailed delivery-status line
export function getOrderStatusDetail(status: TOrderStatus): StatusDisplay {
    switch (status) {
        case 'PENDING':
            return { label: 'Pending', variant: 'warning' };
        case 'CANCELLED':
            return { label: 'Cancelled', variant: 'danger' };
        case 'DELIVERED':
            return { label: 'Delivered', variant: 'success' };
        case 'CONFIRMED':
            return { label: 'Confirmed', variant: 'info' };
        case 'PROCESSING':
            return { label: 'Processing', variant: 'info' };
        case 'SHIPPED':
            return { label: 'Shipped', variant: 'info' };
        case 'REFUNDED':
            return { label: 'Refunded', variant: 'neutral' };
    }
}