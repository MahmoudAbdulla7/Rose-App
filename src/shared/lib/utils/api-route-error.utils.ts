import 'server-only';

import { NextResponse } from 'next/server';

const UNAUTHORIZED_MESSAGES = new Set(['Unauthorized', 'No token found']);

export function handleApiRouteError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Internal Server Error';
  const isUnauthorized = UNAUTHORIZED_MESSAGES.has(message);

  if (isUnauthorized) {
    return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ status: false, message }, { status: 500 });
}
