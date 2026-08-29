import { Link } from '@/i18n/navigation';
import type { IProduct } from '@/shared/lib/types/product'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

type ProductsTableContentProps = {
    products: IProduct[]
}

export default function ProductsTableContent({ products }: ProductsTableContentProps) {
    return (
        <Table className='text-sm text-ds-text-plain'>
            <TableHeader>
                <TableRow className='font-medium'>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className='max-md:hidden'>Sales</TableHead>
                    <TableHead className='max-md:hidden'>Ratings</TableHead>
                    <TableHead />
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => {

                    const lowStock = product.stock < 20;

                    return (
                        <TableRow key={product.id}>
                            <TableCell className='font-semibold'>{product.title}</TableCell>
                            <TableCell>{product.price} EGP</TableCell>
                            <TableCell className={lowStock ? 'text-red-600 font-medium' : ''}>
                                {product.stock}
                            </TableCell>
                            <TableCell className='max-md:hidden'>{product._count.orderItems}</TableCell>
                            <TableCell className='max-md:hidden'>
                                {product.ratings}/5 <span className='text-xs'>({product.ratings})</span>
                            </TableCell>
                            <TableCell className='max-md:hidden flex items-center justify-center gap-2.5 *:flex *:gap-1 *:items-center *:px-2 *:py-1 *:font-medium *:text-xs *:rounded-md'>
                                <Link href='' className='bg-blue-600/25 text-blue-600'>
                                    <Pencil /> Edit
                                </Link>
                                <Link href='' className='bg-red-600/25 text-red-600'>
                                    <Trash2 /> Delete
                                </Link>
                            </TableCell>
                            <TableCell className='md:hidden'>
                                <Popover>
                                    <PopoverTrigger className='border border-zinc-300 rounded'>
                                        <MoreVertical />
                                    </PopoverTrigger>
                                    <PopoverContent className='*:flex *:gap-1 *:items-center *:px-2 *:py-1 *:font-medium *:text-xs *:rounded-md'>
                                        <Link href='' className='text-blue-600'>
                                            <Pencil /> Edit
                                        </Link>
                                        <Link href='' className='text-red-600'>
                                            <Trash2 /> Delete
                                        </Link>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
