import { ClipboardList, Gift, Headphones, Home, Info, PartyPopper } from 'lucide-react';

export const HEADER_NAV_LINKS = [
  { href: '/', label: 'home', icon: Home },
  { href: '/products', label: 'products', icon: Gift },
  { href: '/categories', label: 'categories', icon: ClipboardList },
  { href: '/occasions', label: 'occasions', icon: PartyPopper },
  { href: '/contact', label: 'contact', icon: Headphones },
  { href: '/about', label: 'about', icon: Info },
] as const;

export function isHeaderNavLinkActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}
