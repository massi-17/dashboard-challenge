'use client';

import { ProjectForm } from '@/components/projects/ProjectForm';
import { BackToDashboard } from '@/components/ui/BackToDashboard';
import { Badge } from '@/components/ui/Badge';
import { ErrorState } from '@/components/ui/ErrorState';
import { ProjectEditSkeleton } from '@/components/ui/ProjectEditSkeleton';
import { PermissionGuard } from '@/guards/PermissionGuard';
import type { ProjectCreateFormData } from '@/lib/validations';
import { useProjectQuery, useUpdateProject } from '@/queries/useProjects';
import { useRouter } from 'next/navigation';

interface ProjectEditClientProps {
	id: string;
}

export function ProjectEditClient({ id }: ProjectEditClientProps) {
	const { data: project, error, isLoading } = useProjectQuery(id);
	const router = useRouter();
	const updateProject = useUpdateProject();

	if (isLoading) {
		return <ProjectEditSkeleton />;
	}

	if (error || !project) {
		return (
			<ErrorState
				variant="not-found"
				message="The project you're looking for doesn't exist."
			/>
		);
	}

	const handleSubmit = async (data: ProjectCreateFormData) => {
		updateProject.mutate(
			{ id: project.id, data },
			{
				onSuccess: () => {
					router.push(`/projects/${project.id}`);
				},
			},
		);
	};

	return (
		<PermissionGuard permission="project:edit" projectStatus={project.status}>
			<div className="space-y-6">
				<BackToDashboard />

				<div>
					<div className="mb-6">
						<div className="flex items-center gap-3 mb-2">
							<h1 className="text-3xl font-bold text-[var(--primary)]">
								Edit Project
							</h1>
							<Badge status={project.status} className="text-sm">
								{project.status}
							</Badge>
						</div>
						<p className="text-[var(--secondary-text)]">
							Update project details
						</p>
					</div>
					<ProjectForm
						defaultValues={{
							name: project.name,
							description: project.description || '',
							status: project.status,
						}}
						onSubmit={handleSubmit}
						isLoading={updateProject.isPending}
						submitLabel="Update Project"
						mode="edit"
					/>
				</div>
			</div>
		</PermissionGuard>
	);
}
