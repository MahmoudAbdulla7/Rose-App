'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { IOrderItem, IOrderItemProductSummary } from '@/shared/lib/types/orders';
import OrderItemRow from './order-item-row';
import { cn } from '@/shared/lib/utils';
import { ChevronDown } from 'lucide-react';

const VISIBLE_COUNT = 4;

type OrderItemsListProps = {
    items: IOrderItem<IOrderItemProductSummary>[];
};

export default function OrderItemsList({ items }: OrderItemsListProps) {
    const t = useTranslations('orders.itemsList');
    const [expanded, setExpanded] = useState(false);
    const visibleItems = expanded ? items : items.slice(0, VISIBLE_COUNT);
    const hasMore = items.length > VISIBLE_COUNT;

    return (
        <div className="relative">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {visibleItems.map((item) => (
                    <OrderItemRow key={item.id} item={item} />
                ))}
            </div>
            {hasMore && (
                <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className={cn(
                        'text-maroon-600 dark:text-soft-pink-600 flex w-full cursor-pointer flex-col items-center justify-center text-center font-medium hover:underline',
                        !expanded && 'from-transparent to-ds-subtle via-20% to-40% absolute bottom-0 bg-linear-to-b py-5',
                    )}
                >
                    {expanded ? t('showLess') : t('showAll')}
                    <ChevronDown className={cn(expanded && 'rotate-180')} strokeWidth={2} />
                </button>
            )}
        </div>
    );
}