'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SearchInput } from '@/shared/ui/search-input';
import { setFilterHref } from '@/shared/lib/utils/filter.utils';
import { searchParamsToObject } from '@/shared/lib/utils/search-params.utils';
import { useDebounce } from '@/shared/hooks/use-debounce.hook';

const SEARCH_KEY = 'search';

export default function ProductsSearch() {
    // Routing primitives
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    // Local, controlled input state — seeded from the URL so a refresh
    // keeps whatever search term is already applied.
    const [value, setValue] = useState(params.get(SEARCH_KEY) ?? '');

    // Push the debounced value into the URL. Depend only on the primitive
    // `value`, not on a freshly-created searchParams object — that object
    // is a new reference on every render and would reset the debounce
    // timer before it ever fires.
    useDebounce({
        callback: () => {
            const currentSearch = params.get(SEARCH_KEY) ?? '';
            if (value === currentSearch) return;

            const searchParams = searchParamsToObject(params);
            router.push(pathname + setFilterHref(searchParams, SEARCH_KEY, value));
        },
        deps: [value],
    });

    return (
        <SearchInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClear={() => setValue('')}
            className="my-4.5"
        />
    );
}