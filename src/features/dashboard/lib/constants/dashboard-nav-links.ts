import { CalendarHeart, ClipboardList, LayoutDashboard, Package } from 'lucide-react';

export const DASHBOARD_NAV_LINKS = [
  { href: '/dashboard', label: 'overview', icon: LayoutDashboard },
  { href: '/dashboard/categories', label: 'categories', icon: ClipboardList },
  { href: '/dashboard/occasions', label: 'occasions', icon: CalendarHeart },
  { href: '/dashboard/products', label: 'products', icon: Package },
] as const;

export function isDashboardNavLinkActive(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === '/dashboard';
  return pathname.startsWith(href);
}
