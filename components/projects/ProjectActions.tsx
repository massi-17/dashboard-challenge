'use client';

import { Button } from '@/components/ui/Button';
import { usePermission } from '@/hooks/usePermission';
import { useUpdateProjectStatus } from '@/queries/useProjects';
import type { Project } from '@/types';
import type { UseMutationResult } from '@tanstack/react-query';
import { Archive, CheckCircle, Edit, Loader2, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface ProjectActionsProps {
	project: Project;
	updateStatusMutation?: UseMutationResult<
		Project,
		Error,
		{ id: string; status: 'Draft' | 'Active' | 'Archived' },
		unknown
	>;
}

export function ProjectActions({
	project,
	updateStatusMutation,
}: ProjectActionsProps) {
	const { can } = usePermission();
	const localUpdateStatus = useUpdateProjectStatus();
	const updateStatus = updateStatusMutation || localUpdateStatus;

	const handleStatusChange = (status: 'Draft' | 'Active' | 'Archived') => {
		updateStatus.mutate({ id: project.id, status });
	};

	const isLoading = updateStatus.isPending;

	const canEdit = can('project:edit', project.status);
	const canActivate = can('project:activate', project.status);
	const canArchive = can('project:archive', project.status);
	const canRestore = can('project:restore', project.status);

	const hasAnyAction = canEdit || canActivate || canArchive || canRestore;

	if (!hasAnyAction) {
		return (
			<p className="text-sm text-muted-text italic">No actions available</p>
		);
	}

	return (
		<div className="flex flex-wrap items-center gap-3">
			{canEdit && (
				<Button
					asChild
					variant="secondary"
					size="sm"
					disabled={isLoading}
					aria-label="Edit project"
				>
					<Link
						href={`/projects/${project.id}/edit`}
						aria-disabled={isLoading}
						tabIndex={isLoading ? -1 : 0}
						onClick={(e) => {
							if (isLoading) e.preventDefault();
						}}
					>
						<Edit className="w-4 h-4" aria-hidden="true" />
						Edit
					</Link>
				</Button>
			)}

			{canActivate && (
				<Button
					variant="primary"
					size="sm"
					onClick={() => handleStatusChange('Active')}
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
					) : (
						<CheckCircle className="w-4 h-4" aria-hidden="true" />
					)}
					Activate
				</Button>
			)}

			{canArchive && (
				<Button
					variant="secondary"
					size="sm"
					onClick={() => handleStatusChange('Archived')}
					disabled={isLoading}
					className="hover:bg-primary hover:text-[var(--on-color)] transition-colors"
				>
					{isLoading ? (
						<Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
					) : (
						<Archive className="w-4 h-4" aria-hidden="true" />
					)}
					Archive
				</Button>
			)}

			{canRestore && (
				<Button
					variant="primary"
					size="sm"
					onClick={() => handleStatusChange('Draft')}
					disabled={isLoading}
					aria-label="Restore project from archive"
				>
					{isLoading ? (
						<Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
					) : (
						<RotateCcw className="w-4 h-4" aria-hidden="true" />
					)}
					Restore
				</Button>
			)}
		</div>
	);
}
