import CheckoutCancelContent from '@/features/checkout/components/checkout-cancel-content';
import CheckoutResultSkeleton from '@/features/checkout/components/checkout-result-skeleton';
import CheckoutSuccessContent from '@/features/checkout/components/checkout-success-content';
import { getCheckoutSession } from '@/features/checkout/lib/apis/payments.api';
import {
  CHECKOUT_RESULT_STATUS,
  CHECKOUT_RESULT_STATUSES,
  isCheckoutResultStatus,
} from '@/features/checkout/lib/constants/checkout-result-status.constant';
import { isCheckoutSessionSuccessful } from '@/features/checkout/lib/utils/payment.utils';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = PageProps<'/[locale]/checkout/[status]'>;

type StatusContentProps = {
  params: Props['params'];
  searchParams: Props['searchParams'];
};

export function generateStaticParams() {
  return CHECKOUT_RESULT_STATUSES.map((status) => ({ status }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, status } = await params;

  if (!isCheckoutResultStatus(status)) {
    return {};
  }

  const checkoutT = await getTranslations({ locale: locale as Locale, namespace: 'checkout' });
  const commonT = await getTranslations({ locale: locale as Locale, namespace: 'common' });

  const titleKey =
    status === CHECKOUT_RESULT_STATUS.SUCCESS ? 'checkoutSuccessTitle' : 'checkoutCancelTitle';

  return {
    title: `${checkoutT(titleKey)} | ${commonT('app.title')}`,
  };
}

export default function CheckoutStatusPage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<CheckoutResultSkeleton />}>
      <CheckoutStatusContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CheckoutStatusContent({ params, searchParams }: StatusContentProps) {
  const { status } = await params;
  const { session_id: sessionIdParam } = await searchParams;
  const sessionId = Array.isArray(sessionIdParam) ? sessionIdParam[0] : sessionIdParam;

  if (!isCheckoutResultStatus(status)) {
    notFound();
  }

  if (status === CHECKOUT_RESULT_STATUS.CANCEL) {
    return <CheckoutCancelContent />;
  }

  if (sessionId) {
    try {
      const data = await getCheckoutSession(sessionId);

      if (data.status !== true || !isCheckoutSessionSuccessful(data.payload)) {
        return <CheckoutCancelContent />;
      }

      return <CheckoutSuccessContent celebrateOrder />;
    } catch {
      return <CheckoutCancelContent />;
    }
  }

  return <CheckoutSuccessContent />;
}
