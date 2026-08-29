import { Link } from '@/i18n/navigation'
import { Plus } from 'lucide-react'
import React from 'react'

export default function ProductsHeader() {
    return (
        <div className="flex items-center justify-between">
            <h3 className='text-2xl font-semibold'>All Products</h3>
            <Link href='' className='bg-ds-primary text-ds-text-inverse font-medium p-2.5 rounded-xl md:flex md:items-center md:gap-2.5'><Plus /><span className='max-md:hidden'> Add a new product</span></Link>
        </div>
    )
}
