'use client';

import { ProjectForm } from '@/components/projects/ProjectForm';
import { BackToDashboard } from '@/components/ui/BackToDashboard';
import { PermissionGuard } from '@/guards/PermissionGuard';
import type { ProjectCreateFormData } from '@/lib/validations';
import { useCreateProject } from '@/queries/useProjects';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
	const router = useRouter();
	const createProject = useCreateProject();

	const handleSubmit = async (data: ProjectCreateFormData) => {
		const projectData = {
			...data,
			createdAt: new Date().toISOString(),
		};
		createProject.mutate(projectData, {
			onSuccess: () => {
				router.push('/dashboard');
			},
		});
	};

	return (
		<PermissionGuard permission="project:create">
			<div className="space-y-6">
				<BackToDashboard />

				<div>
					<div className="mb-6">
						<h1 className="text-3xl font-bold text-[var(--primary)] mb-2">
							Create New Project
						</h1>
						<p className="text-[var(--secondary-text)]">
							Enter the details of the new project
						</p>
					</div>
					<ProjectForm
						onSubmit={handleSubmit}
						isLoading={createProject.isPending}
						submitLabel="Create Project"
						mode="create"
					/>
				</div>
			</div>
		</PermissionGuard>
	);
}
