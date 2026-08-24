import type { LucideIcon } from 'lucide-react';
import {
    Clock,
    CheckCircle2,
    PackageCheck,
    Truck,
    Ban,
    RotateCcw,
    Loader2,
    Wallet,
    CreditCard,
} from 'lucide-react';
import type { TOrderStatus, TPaymentMethod, TPaymentStatus } from '@/shared/lib/types/orders';

export type TStatusVariant = 'success' | 'info' | 'danger' | 'warning' | 'neutral';

export interface IStatusDisplay {
    label: string;
    variant: TStatusVariant;
    icon: LucideIcon;
}

export function getOrderStatusSummary(status: TOrderStatus): IStatusDisplay {
    switch (status) {
        case 'DELIVERED':
            return { label: 'Done', variant: 'success', icon: CheckCircle2 };
        case 'CANCELLED':
        case 'REFUNDED':
            return { label: 'Cancelled', variant: 'danger', icon: Ban };
        case 'PENDING':
        case 'CONFIRMED':
        case 'PROCESSING':
        case 'SHIPPED':
        default:
            return { label: 'In Progress', variant: 'info', icon: Loader2 };
    }
}

export function getOrderStatusDetail(status: TOrderStatus): IStatusDisplay {
    switch (status) {
        case 'PENDING':
            return { label: 'Pending', variant: 'warning', icon: Clock };
        case 'CONFIRMED':
            return { label: 'Confirmed', variant: 'info', icon: CheckCircle2 };
        case 'PROCESSING':
            return { label: 'Processing', variant: 'info', icon: Loader2 };
        case 'SHIPPED':
            return { label: 'Shipped', variant: 'info', icon: Truck };
        case 'DELIVERED':
            return { label: 'Delivered', variant: 'success', icon: PackageCheck };
        case 'CANCELLED':
            return { label: 'Cancelled', variant: 'danger', icon: Ban };
        case 'REFUNDED':
            return { label: 'Refunded', variant: 'neutral', icon: RotateCcw };
    }
}

export function getPaymentMethodDisplay(paymentMethod: TPaymentMethod): { label: string; icon: LucideIcon } {
    switch (paymentMethod) {
        case 'CASH_ON_DELIVERY':
            return { label: 'Cash', icon: Wallet };
        case 'CREDIT_CARD':
            return { label: 'Credit Card', icon: CreditCard };
    }
}

export function isOrderPaid(paymentStatus: TPaymentStatus): boolean {
    return paymentStatus === 'SUCCEEDED';
}

export function formatOrderNumber(id: string): string {
    return `#${id.slice(0, 8).toUpperCase()}`;
}

export function formatOrderDate(isoDate: string): string {
    return new Date(isoDate).toLocaleString(undefined, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
}