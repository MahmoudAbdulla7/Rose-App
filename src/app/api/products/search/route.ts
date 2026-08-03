import { NextResponse } from 'next/server';

import { routing } from '@/i18n/routing';
import { PRODUCTS_OPTIONS } from '@/shared/lib/apis/products/products.options';
import { searchProducts } from '@/shared/lib/apis/products/search-products.api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.trim() ?? '';
  const locale =
    request.headers.get('accept-language')?.split(',')[0]?.trim() || routing.defaultLocale;

  if (search.length < PRODUCTS_OPTIONS.SEARCH_MIN_CHARS) {
    return NextResponse.json({
      status: true,
      code: 200,
      message: 'OK',
      payload: { data: [], metadata: { page: 1, limit: 0, total: 0, totalPages: 0 } },
    });
  }

  try {
    const response = await searchProducts({ search, options: { locale } });
    return NextResponse.json(response, {
      status: response.status ? 200 : (response.code ?? 500),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to search products';
    return NextResponse.json({ status: false, code: 500, message }, { status: 500 });
  }
}
