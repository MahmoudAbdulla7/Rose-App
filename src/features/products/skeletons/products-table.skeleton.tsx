import { Link } from '@/i18n/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import Skeleton from '@/shared/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function AdminProductsTableSkeleton() {
  const t = await getTranslations('dashboard.pages.products');
  return (
    <Table className="text-ds-text-plain text-sm">
      <TableHeader>
        <TableRow className="font-medium">
          <TableHead>{t('table.name')}</TableHead>
          <TableHead>{t('table.price')}</TableHead>
          <TableHead>{t('table.stock')}</TableHead>
          <TableHead className="max-md:hidden">{t('table.sales')}</TableHead>
          <TableHead className="max-md:hidden">{t('table.rating')}</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 12 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-5 w-30 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-15 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-15 rounded" />
            </TableCell>
            <TableCell className="max-md:hidden">
              <Skeleton className="h-5 w-15 rounded" />
            </TableCell>
            <TableCell className="max-md:hidden">
              <Skeleton className="h-5 w-15 rounded" />
            </TableCell>
            <TableCell className="flex items-center justify-center gap-2.5 *:flex *:items-center *:gap-1 *:rounded-md *:px-2 *:py-1 *:text-xs *:font-medium max-md:hidden">
              <span className="bg-blue-600/5 text-blue-600/5">
                <Pencil /> {t('actions.editProduct')}
              </span>
              <span className="bg-red-600/5 text-red-600/5">
                <Trash2 /> {t('actions.deleteProduct')}
              </span>
            </TableCell>
            <TableCell className="md:hidden">
              <Popover>
                <PopoverTrigger className="rounded border border-zinc-300">
                  <MoreVertical />
                </PopoverTrigger>
                <PopoverContent className="*:flex *:items-center *:gap-1 *:rounded-md *:px-2 *:py-1 *:text-xs *:font-medium">
                  <Link href="" className="text-blue-600">
                    <Pencil /> {t('actions.editProduct')}
                  </Link>
                  <Link href="" className="text-red-600">
                    <Trash2 /> {t('actions.deleteProduct')}
                  </Link>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
