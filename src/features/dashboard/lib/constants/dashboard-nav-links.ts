import { CalendarHeart, ClipboardList, LayoutDashboard, Package } from 'lucide-react';

export const DASHBOARD_NAV_LINKS = [
  { href: '/', label: 'overview', icon: LayoutDashboard },
  { href: '/categories', label: 'categories', icon: ClipboardList },
  { href: '/occasions', label: 'occasions', icon: CalendarHeart },
  { href: '/products', label: 'products', icon: Package },
] as const;

export function isDashboardNavLinkActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
