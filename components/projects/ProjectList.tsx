import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectLoadingSkeleton } from '@/components/projects/ProjectLoadingSkeleton';
import { buttonVariants } from '@/components/ui/Button';
import type { Project, ProjectStatus } from '@/types';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

interface ProjectListProps {
	projects: Project[];
	isLoading: boolean;
	error: Error | null;
	searchQuery: string;
	statusFilter: ProjectStatus | 'all';
	canCreateProject?: boolean;
}

export function ProjectList({
	projects,
	isLoading,
	error,
	searchQuery,
	statusFilter,
	canCreateProject = false,
}: ProjectListProps) {
	if (isLoading) {
		return <ProjectLoadingSkeleton count={3} />;
	}

	if (error) {
		return (
			<div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-6 text-center backdrop-blur-sm">
				<p className="text-destructive font-semibold">Error loading projects</p>
			</div>
		);
	}

	if (projects.length === 0) {
		const hasFilters = searchQuery || statusFilter !== 'all';
		const title = hasFilters ? 'No projects found' : 'No projects available';
		const description = hasFilters
			? 'Try modifying the search filters'
			: 'Start by creating your first project';

		return (
			<div className="rounded-2xl border border-dashed border-border/50 p-12 sm:p-16 text-center backdrop-blur-sm">
				<div className="flex flex-col items-center gap-4">
					<div className="rounded-full bg-muted/50 p-6">
						<Search
							className="h-8 w-8 text-muted-foreground"
							aria-hidden="true"
						/>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-foreground mb-2">
							{title}
						</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
					{canCreateProject && !hasFilters && (
						<Link
							href="/projects/new"
							className={buttonVariants()}
							aria-label="Create your first project"
						>
							<Plus className="h-4 w-4" aria-hidden="true" />
							Create your first project
						</Link>
					)}
				</div>
			</div>
		);
	}

	return (
		<ul className="flex flex-col gap-4 sm:gap-6 md:gap-8">
			{projects.map((project) => (
				<li key={project.id}>
					<ProjectCard project={project} />
				</li>
			))}
		</ul>
	);
}
