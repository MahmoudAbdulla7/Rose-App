'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceDot, XAxis, YAxis } from 'recharts';

import type { Revenue } from '@/features/dashboard/lib/types/stats';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

type Period = 'monthly' | 'week';

type Props = {
  monthlyRevenue?: Revenue;
  weeklyRevenue?: Revenue;
  currency?: string;
};

export default function RevenueChart({ monthlyRevenue, weeklyRevenue, currency = 'EGP' }: Props) {
  const t = useTranslations('dashboard.overview.charts');
  const locale = useLocale();
  const [period, setPeriod] = useState<Period>('monthly');
  const revenue = period === 'monthly' ? monthlyRevenue : weeklyRevenue;
  const chartData = revenue?.points ?? [];
  const numberFormatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
  const highestPoint = chartData.reduce<(typeof chartData)[number] | undefined>(
    (highest, point) => (!highest || point.revenue > highest.revenue ? point : highest),
    undefined,
  );
  const yAxisMaximum = highestPoint?.revenue
    ? Math.max(1000, Math.ceil(highestPoint.revenue / 1000) * 1000)
    : 5000;

  const chartConfig = {
    revenue: { label: t('revenue'), color: 'var(--ds-primary)' },
  };

  return (
    <Card className="bg-ds-plain min-h-132 min-w-0 gap-0 rounded-3xl py-0 ring-0">
      <CardHeader className="flex flex-row items-center justify-between gap-4 px-6 pt-6">
        <CardTitle className="text-ds-text-plain text-2xl font-semibold">{t('revenue')}</CardTitle>
        <div className="flex shrink-0 items-center gap-4" role="tablist" aria-label={t('period')}>
          {(['monthly', 'week'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={period === value}
              onClick={() => setPeriod(value)}
              className={cn(
                'cursor-pointer text-sm font-medium transition-colors sm:text-base',
                period === value
                  ? 'text-ds-primary-saturated font-bold'
                  : 'text-ds-text-muted hover:text-ds-text-plain',
              )}
            >
              {t(value === 'monthly' ? 'monthly' : 'lastWeek')}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-5 pb-5 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="h-105 min-h-80 w-full"
          initialDimension={{ width: 800, height: 420 }}
        >
          <AreaChart accessibilityLayer data={chartData} margin={{ top: 28, right: 12, left: 0 }}>
            <defs>
              <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={0.42} />
                <stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} stroke="var(--ds-border-muted)" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tickMargin={14}
              minTickGap={18}
              tick={{ fill: 'var(--ds-text-plain)', fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              width={48}
              allowDecimals={false}
              domain={[0, yAxisMaximum]}
              tickCount={6}
              tickFormatter={(value: number) => numberFormatter.format(value)}
              tick={{ fill: 'var(--ds-text-plain)', fontWeight: 600 }}
            />
            <ChartTooltip
              cursor={{ stroke: 'var(--ds-border-default)' }}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => (
                    <span className="font-bold">{currencyFormatter.format(Number(value))}</span>
                  )}
                />
              }
            />
            <Area
              dataKey="revenue"
              type="monotone"
              fill="url(#revenue-fill)"
              stroke="var(--color-revenue)"
              strokeWidth={1.5}
              activeDot={{
                r: 6,
                fill: 'var(--color-revenue)',
                stroke: 'var(--ds-plain)',
                strokeWidth: 3,
              }}
            />
            {highestPoint && highestPoint.revenue > 0 && (
              <ReferenceDot
                x={highestPoint.label}
                y={highestPoint.revenue}
                r={7}
                fill="var(--color-revenue)"
                stroke="var(--ds-plain)"
                strokeWidth={3}
                label={{
                  value: currencyFormatter.format(highestPoint.revenue),
                  position: 'top',
                  fill: 'var(--color-revenue)',
                  fontWeight: 700,
                }}
              />
            )}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
