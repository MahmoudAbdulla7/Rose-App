'use server';

import { updateTag } from 'next/cache';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { OCCASIONS_OPTIONS } from '@/shared/lib/apis/occasions/occasions.options';
import type {
  IOccasion,
  ICreateOccasionInput,
  IUpdateOccasionInput,
} from '@/shared/lib/types/occasions';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

export async function createOccasion(data: ICreateOccasionInput): Promise<IOccasion> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(buildApiEndpoint('/occasions').toString(), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as IAPIResponse<{ occasion: IOccasion }>;

  if (!result.status) {
    throw new Error(result.message || 'Failed to create occasion');
  }

  OCCASIONS_OPTIONS.TAGS.forEach((tag) => updateTag(tag));

  return result.payload.occasion;
}

export async function updateOccasion(id: string, data: IUpdateOccasionInput): Promise<IOccasion> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(buildApiEndpoint(`/occasions/${id}`).toString(), {
    method: 'PATCH',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as IAPIResponse<{ occasion: IOccasion }>;

  if (!result.status) {
    throw new Error(result.message || 'Failed to update occasion');
  }

  OCCASIONS_OPTIONS.TAGS.forEach((tag) => updateTag(tag));

  return result.payload.occasion;
}

export async function deleteOccasion(id: string): Promise<void> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(buildApiEndpoint(`/occasions/${id}`).toString(), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  const result = (await response.json()) as IAPIResponse<null>;

  if (!result.status) {
    throw new Error(result.message || 'Failed to delete occasion');
  }

  OCCASIONS_OPTIONS.TAGS.forEach((tag) => updateTag(tag));
}
