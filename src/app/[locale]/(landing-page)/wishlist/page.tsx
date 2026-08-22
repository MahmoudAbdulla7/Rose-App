import WishlistPageContent from '@/features/landing-page/components/wishlist/wishlist-page';
import { getWishlistItems } from '@/shared/lib/apis/wishlist/wishlist.api';
import type { IWishlistItem } from '@/shared/lib/types/wishlist';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
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
  const cookieStore = await cookies();
  const sessionCookieName = process.env.NEXT_AUTH_SESSION_COOKIE;

  if (!sessionCookieName || !cookieStore.has(sessionCookieName)) {
    return [];
  }

  const data = await getWishlistItems();
  return data.payload.wishlistItems;
}

export default async function WishlistPage() {
  const wishlistItems = await getServerWishlistItems();

  return <WishlistPageContent initialItems={wishlistItems} />;
}
