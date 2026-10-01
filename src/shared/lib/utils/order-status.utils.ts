import type { TOrderStatus, TPaymentMethod, TPaymentStatus } from '@/shared/lib/types/orders';
import type { LucideIcon } from 'lucide-react';
import {
    AlertTriangle,
    Check,
    CheckCheck,
    CreditCard,
    Loader2,
    PackageCheck,
    RotateCcw,
    Truck,
    Wallet
} from 'lucide-react';

export type TStatusVariant = 'success' | 'info' | 'danger' | 'warning' | 'neutral';

export interface IStatusDisplay {
    key: string;
    variant: TStatusVariant;
    icon: LucideIcon;
}

export function getOrderStatusSummary(status: TOrderStatus): IStatusDisplay {
    switch (status) {
        case 'DELIVERED':
            return { key: 'done', variant: 'success', icon: CheckCheck };
        case 'CANCELLED':
        case 'REFUNDED':
            return { key: 'cancelled', variant: 'danger', icon: AlertTriangle };
        case 'PENDING':
        case 'CONFIRMED':
        case 'PROCESSING':
        case 'SHIPPED':
        default:
            return { key: 'inProgress', variant: 'info', icon: Loader2 };
    }
}

export function getOrderStatusDetail(status: TOrderStatus): IStatusDisplay {
    switch (status) {
        case 'PENDING':
            return { key: 'pending', variant: 'warning', icon: Truck };
        case 'CONFIRMED':
            return { key: 'confirmed', variant: 'info', icon: Check };
        case 'PROCESSING':
            return { key: 'processing', variant: 'info', icon: Loader2 };
        case 'SHIPPED':
            return { key: 'shipped', variant: 'info', icon: PackageCheck };
        case 'DELIVERED':
            return { key: 'delivered', variant: 'success', icon: CheckCheck };
        case 'CANCELLED':
            return { key: 'cancelled', variant: 'danger', icon: AlertTriangle };
        case 'REFUNDED':
            return { key: 'refunded', variant: 'neutral', icon: RotateCcw };
    }
}

export function getPaymentMethodDisplay(paymentMethod: TPaymentMethod): { key: string; icon: LucideIcon } {
    switch (paymentMethod) {
        case 'CASH_ON_DELIVERY':
            return { key: 'cash', icon: Wallet };
        case 'CREDIT_CARD':
            return { key: 'creditCard', icon: CreditCard };
    }
}

export function isOrderPaid(paymentStatus: TPaymentStatus): boolean {
    return paymentStatus === 'SUCCEEDED';
}

export function formatOrderNumber(id: string): string {
    return id.slice(0, 8).toUpperCase();
}

export function formatOrderDateParts(isoDate: string, locale: string): { date: string; time: string } {
    const parsed = new Date(isoDate);

    const day = parsed.toLocaleString(locale, { day: '2-digit' });
    const month = parsed.toLocaleString(locale, { month: 'long' });
    const year = parsed.toLocaleString(locale, { year: 'numeric' });
    const time = parsed.toLocaleString(locale, { hour: 'numeric', minute: '2-digit' });

    return { date: `${day} ${month}, ${year}`, time };
}