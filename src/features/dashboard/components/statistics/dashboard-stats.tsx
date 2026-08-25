import CategoriesStats from '@/features/dashboard/components/statistics/categories-stats';
import LowStockStats from '@/features/dashboard/components/statistics/low-stock-stats';
import SummaryStats from '@/features/dashboard/components/statistics/summary-stats';
import TopSellingStats from '@/features/dashboard/components/statistics/top-selling-stats';
import { getStats } from '@/features/dashboard/lib/apis/stats.api';

export default async function DashboardStats() {
  const stats = await getStats();

  return (
    <div className="bg-ds-subtle grid grid-cols-1 gap-6 p-4 lg:grid-cols-2">
      <SummaryStats summary={stats?.payload.summary} />

      <CategoriesStats categories={stats?.payload.categories} />

      <TopSellingStats
        products={stats?.payload.topSellingProducts}
        currency={stats?.payload.summary.currency}
      />

      <LowStockStats products={stats?.payload.lowStockProducts} />
    </div>
  );
}
