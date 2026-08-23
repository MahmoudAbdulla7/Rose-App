import { ClipboardList, Gift, Headphones, Home, Info, PartyPopper } from 'lucide-react';

export const HEADER_NAV_LINKS = [
  { href: '/', label: 'home', icon: Home, prefetch: true },
  { href: '/products', label: 'products', icon: Gift, prefetch: true },
  { href: '/categories', label: 'categories', icon: ClipboardList, prefetch: false },
  { href: '/occasions', label: 'occasions', icon: PartyPopper, prefetch: false },
  { href: '/contact', label: 'contact', icon: Headphones, prefetch: false },
  { href: '/about', label: 'about', icon: Info, prefetch: false },
] as const;

export function isHeaderNavLinkActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}
