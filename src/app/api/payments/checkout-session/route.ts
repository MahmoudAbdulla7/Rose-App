import { getCheckoutSession } from '@/features/checkout/lib/apis/payments.api';
import { handleApiRouteError } from '@/shared/lib/utils/api-route-error.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get('session_id')?.trim();

  if (!sessionId) {
    return NextResponse.json(
      { status: false, code: 400, message: 'Missing session_id' },
      { status: 400 },
    );
  }

  try {
    const data = await getCheckoutSession(sessionId);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiRouteError(error);
  }
}
