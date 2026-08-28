import { CalendarHeart, ClipboardList, LayoutDashboard, Package } from 'lucide-react';

// The admin slot mirrors the storefront routes, so the dashboard lives at the root.
export const DASHBOARD_ROOT = '/';

export const DASHBOARD_NAV_LINKS = [
  { href: DASHBOARD_ROOT, label: 'overview', icon: LayoutDashboard },
  { href: '/categories', label: 'categories', icon: ClipboardList },
  { href: '/occasions', label: 'occasions', icon: CalendarHeart },
  { href: '/products', label: 'products', icon: Package },
] as const;

export function isDashboardNavLinkActive(pathname: string, href: string) {
  if (href === DASHBOARD_ROOT) return pathname === DASHBOARD_ROOT;
  return pathname.startsWith(href);
}
