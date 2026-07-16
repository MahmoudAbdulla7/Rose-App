import { headers } from 'next/headers';
import { userAgent } from 'next/server';

/**
 * Detects whether the current request is from a mobile device.
 */
export async function isMobileDevice(): Promise<boolean> {
  const headersList = await headers();
  const parsedAgent = userAgent({ headers: headersList });

  return parsedAgent.device.type === 'mobile';
}
