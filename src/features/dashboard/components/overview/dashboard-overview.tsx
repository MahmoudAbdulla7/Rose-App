import CategoriesStats from '@/features/dashboard/components/overview/categories-stats';
import LowStockStats from '@/features/dashboard/components/overview/low-stock-stats';
import OrderStatusChart from '@/features/dashboard/components/overview/order-status-chart';
import RevenueChart from '@/features/dashboard/components/overview/revenue-chart';
import SummaryStats from '@/features/dashboard/components/overview/summary-stats';
import TopSellingStats from '@/features/dashboard/components/overview/top-selling-stats';
import { getStats } from '@/features/dashboard/lib/apis/stats.api';

export default async function DashboardOverview() {
  const [stats, weeklyStats] = await Promise.all([getStats(), getStats({ revenuePeriod: 'week' })]);

  return (
    <div className="bg-ds-subtle grid grid-cols-1 gap-6 p-4 lg:grid-cols-2">
      <SummaryStats summary={stats?.payload.summary} />

      <CategoriesStats categories={stats?.payload.categories} />

      <div className="col-span-full grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(18rem,0.8fr)_minmax(0,2.2fr)]">
        <OrderStatusChart orderStatus={stats?.payload.orderStatus} />
        <RevenueChart
          monthlyRevenue={stats?.payload.revenue}
          weeklyRevenue={weeklyStats?.payload.revenue}
          currency={stats?.payload.summary.currency}
        />
      </div>

      <TopSellingStats
        products={stats?.payload.topSellingProducts}
        currency={stats?.payload.summary.currency}
      />

      <LowStockStats products={stats?.payload.lowStockProducts} />
    </div>
  );
}
