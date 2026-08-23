import { clientRequest } from '@/shared/lib/apis/client-request.api';

import type { ICreateOrderPayload, ICreateOrderResponse } from '../types/order';

export function createOrderRequest(payload: ICreateOrderPayload): Promise<ICreateOrderResponse> {
  return clientRequest<ICreateOrderResponse>(
    '/api/orders',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    'Failed to create order',
  );
}
