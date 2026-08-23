import { createOrder } from '@/features/checkout/lib/apis/orders.server.api';
import type { ICreateOrderPayload } from '@/features/checkout/lib/types/order';
import { handleApiRouteError } from '@/shared/lib/utils/api-route-error.utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ICreateOrderPayload;
    const data = await createOrder(payload);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}
