import { createPaymentIntent } from '@/features/checkout/lib/apis/payments.api';
import { handleApiRouteError } from '@/shared/lib/utils/api-route-error.utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();
    const data = await createPaymentIntent(orderId);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}
