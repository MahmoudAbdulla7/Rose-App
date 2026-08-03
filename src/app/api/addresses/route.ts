import { NextResponse } from 'next/server';

import { getCurrentAddress } from '@/shared/lib/apis/addresses/address.api';

export async function GET() {
  try {
    const data = await getCurrentAddress();

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';

    if (message === 'Unauthorized' || message === 'No token found') {
      return NextResponse.json({ message }, { status: 401 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
