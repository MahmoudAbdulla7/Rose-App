'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Cell, Pie, PieChart, type PieLabelRenderProps } from 'recharts';

import type { OrderStatus } from '@/features/dashboard/lib/types/stats';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

type Props = {
  orderStatus?: OrderStatus;
};

const STATUS_COLORS = {
  completed: 'var(--ds-success)',
  inProgress: 'var(--ds-info)',
  canceled: 'var(--ds-danger)',
} as const;

function PercentageLabel({ cx, cy, midAngle, outerRadius, percent }: PieLabelRenderProps) {
  const radius = Number(outerRadius) * 0.92;
  const angle = (-Number(midAngle) * Math.PI) / 180;
  const x = Number(cx) + radius * Math.cos(angle);
  const y = Number(cy) + radius * Math.sin(angle);
  const value = Math.round(Number(percent));

  if (!value) return null;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="22" fill="var(--ds-plain)" stroke="var(--ds-border-muted)" />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--ds-text-plain)"
        className="text-xs font-bold"
      >
        {value}%
      </text>
    </g>
  );
}

export default function OrderStatusChart({ orderStatus }: Props) {
  const t = useTranslations('dashboard.overview.charts');
  const locale = useLocale();
  const numberFormatter = new Intl.NumberFormat(locale);

  const chartData = [
    {
      status: 'completed',
      label: t('completed'),
      value: orderStatus?.completed.count ?? 0,
      percent: orderStatus?.completed.percent ?? 0,
      fill: STATUS_COLORS.completed,
    },
    {
      status: 'inProgress',
      label: t('inProgress'),
      value: orderStatus?.inProgress.count ?? 0,
      percent: orderStatus?.inProgress.percent ?? 0,
      fill: STATUS_COLORS.inProgress,
    },
    {
      status: 'canceled',
      label: t('canceled'),
      value: orderStatus?.canceled.count ?? 0,
      percent: orderStatus?.canceled.percent ?? 0,
      fill: STATUS_COLORS.canceled,
    },
  ];
  const hasOrders = chartData.some((item) => item.value > 0);
  const pieData = hasOrders
    ? chartData
    : [{ status: 'empty', label: t('noOrders'), value: 1, percent: 0, fill: 'var(--ds-soft)' }];

  const chartConfig = {
    completed: { label: t('completed'), color: STATUS_COLORS.completed },
    inProgress: { label: t('inProgress'), color: STATUS_COLORS.inProgress },
    canceled: { label: t('canceled'), color: STATUS_COLORS.canceled },
  };

  return (
    <Card className="bg-ds-plain min-h-132 gap-0 rounded-3xl py-0 ring-0">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-ds-text-plain text-2xl font-semibold">
          {t('orderStatus')}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col px-6 pb-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-76 w-full max-w-80 shrink-0"
          initialDimension={{ width: 320, height: 304 }}
        >
          <PieChart accessibilityLayer>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="status"
                  formatter={(value, _name, item) => (
                    <div className="flex min-w-32 items-center justify-between gap-4">
                      <span className="text-ds-text-soft">{item.payload.label}</span>
                      <span className="font-bold">{numberFormatter.format(Number(value))}</span>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="status"
              innerRadius={58}
              outerRadius={112}
              paddingAngle={0}
              stroke="none"
              labelLine={false}
              label={hasOrders ? PercentageLabel : false}
            >
              {pieData.map((item) => (
                <Cell key={item.status} fill={item.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        <ul className="mt-auto flex flex-col gap-4" aria-label={t('orderStatusLegend')}>
          {chartData.map((item) => (
            <li key={item.status} className="flex items-center gap-3 text-sm">
              <span className="size-3 shrink-0 rounded-full" style={{ background: item.fill }} />
              <span className="text-ds-text-plain min-w-0 flex-1 font-medium">{item.label}</span>
              <span className="text-ds-text-plain shrink-0 font-bold tabular-nums">
                {numberFormatter.format(item.value)} ({item.percent}%)
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
