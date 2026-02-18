import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { projectsApi } from '@/lib/api/projects';

interface DashboardPageProps {
	searchParams: {
		page?: string;
		search?: string;
		status?: string;
	};
}

export default async function DashboardPage({
	searchParams,
}: DashboardPageProps) {
	const allProjects = await projectsApi.getAll();

	return <DashboardClient allProjects={allProjects} />;
}
