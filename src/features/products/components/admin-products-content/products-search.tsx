'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchInput } from '@/shared/ui/search-input';
import { setFilterHref } from '@/shared/lib/utils/filter.utils';
import { searchParamsToObject } from '@/shared/lib/utils/search-params.utils';
import { useDebounce } from '@/shared/hooks/use-debounce.hook';

const SEARCH_KEY = 'search';

export default function ProductsSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const searchParams = searchParamsToObject(params);

    const [value, setValue] = useState(params.get(SEARCH_KEY) ?? '');
    const debouncedValue = useDebounce({
        callback: () => {
            const currentSearch = params.get(SEARCH_KEY) ?? '';
            if (value === currentSearch) return;
            router.push(pathname + setFilterHref(searchParams, SEARCH_KEY, value));
        },
        deps: [value, params, pathname, router, searchParams],
    });

    useEffect(() => {
        const currentSearch = params.get(SEARCH_KEY) ?? '';

        if (typeof debouncedValue !== 'string') return;
        if (debouncedValue === currentSearch) return;

        router.push(pathname + setFilterHref(searchParams, SEARCH_KEY, debouncedValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    return <SearchInput value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue('')} className='my-4.5' />;
}