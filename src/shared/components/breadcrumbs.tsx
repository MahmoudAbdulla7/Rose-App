'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

type BreadcrumbItemType = {
  label: string;
  href: string;
  isCurrent?: boolean;
};

type EllipsisItemType = {
  label: '…';
  href: '';
  isEllipsis: true;
};

type DisplayItem = BreadcrumbItemType | EllipsisItemType;

export default function BreadcrumbsTestComponent() {
  const path = usePathname();
  const segments = path.split('/').filter((seg) => seg !== '');

  // Build list of pages
  const fullItems: BreadcrumbItemType[] = segments.map((seg, index) => {
    let label = seg.replace(/-/g, ' ');
    const href = '/' + segments.slice(0, index + 1).join('/');

    if (index === 0 && (seg === 'en' || seg === 'ar')) {
      label = 'Home';
    }

    return { label, href, isCurrent: href === path };
  });

  // Truncate if >5 items
  let displayItems: DisplayItem[];
  if (fullItems.length > 5) {
    const firstTwo = fullItems.slice(0, 2);
    const lastTwo = fullItems.slice(-2);
    const ellipsis: EllipsisItemType = {
      label: '…',
      href: '',
      isEllipsis: true,
    };
    displayItems = [...firstTwo, ellipsis, ...lastTwo];
  } else {
    displayItems = fullItems;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {displayItems.flatMap((item, index) => {
          const isLast = index === displayItems.length - 1;

          // ellipsis
          if ('isEllipsis' in item && item.isEllipsis) {
            const ellipsisElement = (
              <>
                <BreadcrumbItem key={`ellipsis-${index}`}>
                  <span className="text-muted-foreground px-2">…</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            );

            return [ellipsisElement];
          }

          // Pages
          const breadcrumbItem = (
            <BreadcrumbItem key={item.href}>
              {isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href={item.href} />}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );

          // No Separator for last item
          if (isLast) {
            return [breadcrumbItem];
          }

          // Otherwise, item and a separator
          return [breadcrumbItem, <BreadcrumbSeparator key={`sep-${index}`} />];
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
