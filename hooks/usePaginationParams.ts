'use client';

import type { PaginationParams, ProjectStatus } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

const DEFAULT_PAGE_SIZE = 6;

export function usePaginationParams() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const params = useMemo((): PaginationParams => {
		const page = Number(searchParams.get('page')) || 1;
		const pageSize = Number(searchParams.get('pageSize')) || DEFAULT_PAGE_SIZE;
		const search = searchParams.get('search') || '';
		const status =
			(searchParams.get('status') as ProjectStatus | 'all') || 'all';

		return {
			page: Math.max(1, page),
			pageSize: Math.max(1, Math.min(50, pageSize)),
			search,
			status,
		};
	}, [searchParams]);

	const updateParams = useCallback(
		(updates: Partial<PaginationParams>) => {
			const newParams = new URLSearchParams(searchParams.toString());

			if (
				(updates.search !== undefined && updates.search !== params.search) ||
				(updates.status !== undefined && updates.status !== params.status)
			) {
				updates.page = 1;
			}

			Object.entries(updates).forEach(([key, value]) => {
				if (value === undefined || value === '' || value === 'all') {
					newParams.delete(key);
				} else {
					newParams.set(key, String(value));
				}
			});

			if (newParams.get('page') === '1') {
				newParams.delete('page');
			}

			const newUrl = newParams.toString()
				? `${pathname}?${newParams.toString()}`
				: pathname;
			router.push(newUrl, { scroll: false });
		},
		[params, pathname, router, searchParams],
	);

	const setPage = useCallback(
		(page: number) => updateParams({ page }),
		[updateParams],
	);

	const setSearch = useCallback(
		(search: string) => updateParams({ search }),
		[updateParams],
	);

	const setStatus = useCallback(
		(status: ProjectStatus | 'all') => updateParams({ status }),
		[updateParams],
	);

	return {
		params,
		setPage,
		setSearch,
		setStatus,
		updateParams,
	};
}
