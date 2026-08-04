import WishlistPageContent from '@/features/landing-page/components/wishlist/wishlist-page';
import { fetchWishlistItems } from '@/shared/lib/apis/wishlist/user-wishlist-items.api';
import type { IWishlistItem } from '@/shared/lib/types/wishlist';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const commonT = await getTranslations({ locale: locale as Locale, namespace: 'common' });

  return {
    title: `${commonT('app.title')} | ${commonT('pages.wishlist')}`,
    description: commonT('wishlist.metadataDescription'),
  };
}

async function getServerWishlistItems(): Promise<IWishlistItem[]> {
  const headerStore = await headers();
  const host = headerStore.get('host');

  if (!host) {
    return [];
  }

  const protocol =
    headerStore.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const cookie = headerStore.get('cookie') ?? undefined;

  try {
    const data = await fetchWishlistItems({
      origin: `${protocol}://${host}`,
      cookie,
      cache: 'no-store',
    });

    return data.status === true ? data.payload.wishlistItems : [];
  } catch {
    return [];
  }
}

export default async function WishlistPage() {
  const wishlistItems = await getServerWishlistItems();

  return <WishlistPageContent initialItems={wishlistItems} />;
}
