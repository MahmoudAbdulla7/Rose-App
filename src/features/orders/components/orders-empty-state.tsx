"use client"

import { useTranslations } from "next-intl";

export default function OrdersEmptyState() {
    const t = useTranslations('orders')
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-medium">{t('empty')}</p>
        </div>
    );
}