import { confirmPayment } from '@/features/checkout/lib/apis/payments.api';
import type { IConfirmPaymentPayload } from '@/features/checkout/lib/types/payment';
import { handleApiRouteError } from '@/shared/lib/utils/api-route-error.utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as IConfirmPaymentPayload;
    const data = await confirmPayment(payload);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}
