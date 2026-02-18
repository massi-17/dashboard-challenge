'use client';

import { ProjectActions } from '@/components/projects/ProjectActions';
import { BackToDashboard } from '@/components/ui/BackToDashboard';
import { Badge } from '@/components/ui/Badge';
import { DetailsSkeleton } from '@/components/ui/DetailsSkeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { ProjectDetailSkeleton } from '@/components/ui/ProjectDetailSkeleton';
import { formatDate } from '@/lib/format';
import { useProjectQuery, useUpdateProjectStatus } from '@/queries/useProjects';
import { Calendar } from 'lucide-react';

interface ProjectDetailClientProps {
	id: string;
}

export function ProjectDetailClient({ id }: ProjectDetailClientProps) {
	const { data: project, error, isLoading, isRefetching } = useProjectQuery(id);
	const updateStatus = useUpdateProjectStatus();

	if (isLoading) {
		return <ProjectDetailSkeleton />;
	}

	if (error || !project) {
		return (
			<ErrorState
				variant="not-found"
				message="The project you're looking for doesn't exist."
			/>
		);
	}
	return (
		<article className="space-y-6">
			<BackToDashboard />

			<div className="fade-in">
				<header className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
					<div className="flex-1">
						{updateStatus.isPending || isRefetching ? (
							<DetailsSkeleton />
						) : (
							<>
								<h1 className="text-3xl font-bold text-primary mb-2">
									{project.name}
								</h1>
								<Badge status={project.status} className="text-sm">
									{project.status}
								</Badge>
							</>
						)}
					</div>
				</header>

				{!updateStatus.isPending && !isRefetching && project.description && (
					<section className="mb-6" aria-labelledby="description-heading">
						<h2
							id="description-heading"
							className="text-sm font-medium text-muted-text font-mono mb-2"
						>
							Description
						</h2>
						<p className="text-secondary-text leading-relaxed">
							{project.description}
						</p>
					</section>
				)}

				<section
					className="mb-8 p-6 rounded-lg bg-[var(--muted)] border border-[var(--border)]"
					aria-labelledby="metadata-heading"
				>
					<div>
						<h3
							id="metadata-heading"
							className="text-xs font-medium text-muted-text font-mono mb-2"
						>
							Creation Date
						</h3>
						<div className="flex items-center gap-2 text-secondary-text">
							<Calendar className="w-4 h-4" aria-hidden="true" />
							<time dateTime={project.createdAt}>
								{formatDate(project.createdAt, true)}
							</time>
						</div>
					</div>
				</section>

				<section
					className="pt-6 border-t border-[var(--border)]"
					aria-labelledby="actions-heading"
				>
					<h3
						id="actions-heading"
						className="text-sm font-medium text-muted-text font-mono mb-4"
					>
						Available Actions
					</h3>
					<ProjectActions
						project={project}
						updateStatusMutation={updateStatus}
					/>
				</section>
			</div>
		</article>
	);
}
