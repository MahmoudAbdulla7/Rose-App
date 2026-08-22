import { NextResponse } from 'next/server';

import { getCouponByCode } from '@/shared/lib/apis/coupons/coupons.api';

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code')?.trim();

  if (!code) {
    return NextResponse.json(
      { status: false, code: 400, message: 'Missing coupon code' },
      { status: 400 },
    );
  }

  try {
    const coupon = await getCouponByCode(code);

    if (!coupon) {
      return NextResponse.json(
        { status: false, code: 404, message: 'Coupon not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ status: true, code: 200, message: 'OK', payload: coupon });
  } catch {
    return NextResponse.json(
      { status: false, code: 500, message: 'Failed to load coupon' },
      { status: 500 },
    );
  }
}
