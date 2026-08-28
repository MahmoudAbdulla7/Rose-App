'use server';

import { updateTag } from 'next/cache';

import { API_HEADERS } from '@/shared/lib/apis/headers.options';
import { CATEGORIES_OPTIONS } from '@/shared/lib/apis/categories/categories.options';
import type {
  ICategory,
  ICreateCategoryInput,
  IUpdateCategoryInput,
} from '@/shared/lib/types/categories';
import { buildApiEndpoint } from '@/shared/lib/utils/api-endpoint-builder.utils';
import { getNextAuthToken } from '@/shared/lib/utils/auth.utils';

export async function createCategory(data: ICreateCategoryInput): Promise<ICategory> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(buildApiEndpoint('/categories').toString(), {
    method: 'POST',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as IAPIResponse<{ category: ICategory }>;

  if (!result.status) {
    throw new Error(result.message || 'Failed to create category');
  }

  CATEGORIES_OPTIONS.TAGS.forEach((tag) => updateTag(tag));

  return result.payload.category;
}

export async function updateCategory(id: string, data: IUpdateCategoryInput): Promise<ICategory> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(buildApiEndpoint(`/categories/${id}`).toString(), {
    method: 'PATCH',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as IAPIResponse<{ category: ICategory }>;

  if (!result.status) {
    throw new Error(result.message || 'Failed to update category');
  }

  CATEGORIES_OPTIONS.TAGS.forEach((tag) => updateTag(tag));

  return result.payload.category;
}

export async function deleteCategory(id: string): Promise<void> {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(buildApiEndpoint(`/categories/${id}`).toString(), {
    method: 'DELETE',
    headers: {
      ...API_HEADERS.JSON,
      ...API_HEADERS.AUTHORIZATION(token.accessToken),
    },
  });

  const result = (await response.json()) as IAPIResponse<null>;

  if (!result.status) {
    throw new Error(result.message || 'Failed to delete category');
  }

  CATEGORIES_OPTIONS.TAGS.forEach((tag) => updateTag(tag));
}
