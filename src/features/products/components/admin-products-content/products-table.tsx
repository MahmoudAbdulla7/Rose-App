import { Link } from '@/i18n/navigation';
import type { IProduct } from '@/shared/lib/types/product';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { MoreVertical, Pencil, Plus, Trash2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

type ProductsTableContentProps = {
  products: IProduct[];
};

export default async function ProductsTableContent({ products }: ProductsTableContentProps) {
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
          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="py-16">
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <p className="font-semibold">{t('empty.title')}</p>
                <p className="text-ds-text-muted text-xs">{t('empty.description')}</p>
                <Link
                  href=""
                  className="bg-ds-primary text-ds-text-inverse mt-2 flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium"
                >
                  <Plus className="size-4" />
                  {t('actions.addProduct')}
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => {
            const lowStock = product.stock < 15;
            return (
              <TableRow key={product.id}>
                <TableCell className="truncate font-semibold">{product.title}</TableCell>
                <TableCell>{t('price', { price: product.price })} </TableCell>
                <TableCell className={lowStock ? 'font-medium text-red-600' : ''}>
                  {product.stock}
                </TableCell>
                <TableCell className="max-md:hidden">{product._count.orderItems}</TableCell>
                <TableCell className="max-md:hidden">
                  {Math.round(product.rating)}/5 <span className="text-xs">({product.ratings})</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2.5 *:flex *:items-center *:gap-1 *:rounded-md *:px-2 *:py-1 *:text-xs *:font-medium max-md:hidden">
                    <Link href="" className="bg-blue-600/25 text-blue-600">
                      <Pencil /> {t('actions.editProduct')}
                    </Link>
                    <Link href="" className="bg-red-600/25 text-red-600">
                      <Trash2 /> {t('actions.deleteProduct')}
                    </Link>
                  </div>
                  <Popover>
                    <PopoverTrigger className="rounded border border-zinc-300 md:hidden">
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
            );
          })
        )}
      </TableBody>
    </Table>
  );
}