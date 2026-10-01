'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import type { IOrder } from '@/shared/lib/types/orders';
import { cn } from '@/shared/lib/utils';
import {
    formatOrderDateParts,
    formatOrderNumber,
    getOrderStatusDetail,
    getOrderStatusSummary,
    getPaymentMethodDisplay,
    isOrderPaid,
} from '@/shared/lib/utils/order-status.utils';
import OrderItemsList from './order-items-list';
import OrderStatusBadge from './order-status-badge';

type OrderCardProps = {
    order: IOrder;
};

export default function OrderCard({ order }: OrderCardProps) {
    const t = useTranslations('orders');
    const locale = useLocale();

    const summary = getOrderStatusSummary(order.status);
    const deliveryDetail = getOrderStatusDetail(order.status);
    const paymentMethod = getPaymentMethodDisplay(order.paymentMethod);
    const paid = isOrderPaid(order.paymentStatus);
    const createdAt = order.createdAt instanceof Date ? order.createdAt.toISOString() : String(order.createdAt);
    const { date, time } = formatOrderDateParts(createdAt, locale);

    const DeliveryIcon = deliveryDetail.icon;
    const PaymentMethodIcon = paymentMethod.icon;

    return (
        <div className="overflow-hidden rounded-xl border">
            <div className="bg-maroon-600 flex items-center justify-between px-4 py-3 text-white">
                <span className="font-semibold">{t('orderNumber', { number: formatOrderNumber(order.id) })}</span>
                <span className="text-sm opacity-90">{t('date', { date, time })}</span>
            </div>

            <div className="bg-ds-surface-muted space-y-3 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">
                            {t('total')}: <span>{order.total} EGP</span>
                        </p>
                        {paid && <OrderStatusBadge label={t('status.paid')} variant="success" icon={Check} />}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{t('status.title')}:</span>
                        <OrderStatusBadge label={t(`summary.${summary.key}` as never)} variant={summary.variant} icon={summary.icon} />                    </div>
                </div>

                <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-1.5">
                        <span className="font-medium">{t('paymentMethod.title')}:</span>
                        <PaymentMethodIcon className="size-4" aria-hidden="true" />
                        {t(`paymentMethod.${paymentMethod.key}` as never)}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <span className="font-medium">{t('status.title')}:</span>
                        <DeliveryIcon
                            className={cn(
                                'size-4',
                                deliveryDetail.variant === 'success' && 'text-green-600',
                                deliveryDetail.variant === 'danger' && 'text-red-600',
                                deliveryDetail.variant === 'warning' && 'text-amber-600',
                                deliveryDetail.variant === 'info' && 'text-blue-600',
                                deliveryDetail.variant === 'neutral' && 'text-gray-600',
                            )}
                            aria-hidden="true"
                        />
                        <span
                            className={cn(
                                deliveryDetail.variant === 'success' && 'text-green-600',
                                deliveryDetail.variant === 'danger' && 'text-red-600',
                                deliveryDetail.variant === 'warning' && 'text-amber-600',
                                deliveryDetail.variant === 'info' && 'text-blue-600',
                                deliveryDetail.variant === 'neutral' && 'text-gray-600',
                            )}
                        >
                            {t(`status.${deliveryDetail.key}` as never)}
                        </span>
                    </p>
                </div>

                <div>
                    <p className="mb-2 text-sm font-medium">{t('orderItems')}:</p>
                    <OrderItemsList items={order.orderItems} />
                </div>
            </div>
        </div>
    );
}