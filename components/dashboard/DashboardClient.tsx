'use client';

import { Stats } from '@/components/dashboard/Stats';
import { ProjectList } from '@/components/projects/ProjectList';
import { ProjectsToolbar } from '@/components/projects/ProjectsToolbar';
import { PageHeader } from '@/components/ui/PageHeader';
import { Pagination } from '@/components/ui/Pagination';
import { useDebounce } from '@/hooks/useDebouncedSearchParam';
import { usePaginationParams } from '@/hooks/usePaginationParams';
import { usePermission } from '@/hooks/usePermission';
import { projectsApi } from '@/lib/api/projects';
import { useProjectsQuery } from '@/queries/useProjects';
import type { Project, ProjectStatus } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const STATS_STALE_TIME = 60000;
const SCROLL_DELAY = 50;
const SEARCH_MIN_LENGTH = 3;

interface DashboardClientProps {
	allProjects: Project[];
}

export function DashboardClient({ allProjects }: DashboardClientProps) {
	const { can } = usePermission();
	const { params, setPage, setSearch, setStatus } = usePaginationParams();

	const { searchInput, setSearchInput, debouncedSearch } = useDebounce({
		initialValue: params.search || '',
	});

	useEffect(() => {
		const value =
			debouncedSearch.length === 0 ||
			debouncedSearch.length >= SEARCH_MIN_LENGTH
				? debouncedSearch
				: '';
		if (value !== params.search) {
			setSearch(value);
		}
	}, [debouncedSearch, params.search, setSearch]);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		const id = setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: prefersReducedMotion ? 'auto' : 'smooth',
			});
		}, SCROLL_DELAY);
		return () => clearTimeout(id);
	}, [params.page]);

	const { data: paginatedData, isLoading, error } = useProjectsQuery(params);

	const { data: allProjectsForStats } = useQuery({
		queryKey: ['projects', 'stats'],
		queryFn: () => projectsApi.getAll(),
		staleTime: STATS_STALE_TIME,
		initialData: allProjects,
	});

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const handleStatusFilterChange = (status: ProjectStatus | 'all') => {
		setStatus(status);
	};

	return (
		<div className="space-y-8 pt-2 pb-6 sm:pb-8 md:pb-10">
			<PageHeader
				title="Dashboard Overview"
				description="Monitor and manage your projects in real-time"
				gradient
			/>

			<Stats
				projects={allProjectsForStats || []}
				onStatusClick={handleStatusFilterChange}
				currentFilter={params.status || 'all'}
			/>

			<ProjectsToolbar
				searchQuery={searchInput}
				onSearchChange={handleSearchChange}
				statusFilter={params.status || 'all'}
				onStatusFilterChange={handleStatusFilterChange}
				canCreateProject={can('project:create')}
			/>

			<ProjectList
				projects={paginatedData?.items || []}
				isLoading={isLoading}
				error={error}
				searchQuery={params.search || ''}
				statusFilter={params.status || 'all'}
				canCreateProject={can('project:create')}
			/>

			{paginatedData && (
				<Pagination
					currentPage={paginatedData.page}
					totalPages={paginatedData.totalPages}
					onPageChange={(page) => {
						setPage(page);
					}}
					isLoading={isLoading}
				/>
			)}
		</div>
	);
}
