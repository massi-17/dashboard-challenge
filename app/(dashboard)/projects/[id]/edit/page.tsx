import { ProjectEditClient } from '@/components/projects/ProjectEditClient';

interface EditProjectPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function EditProjectPage({
	params,
}: EditProjectPageProps) {
	const { id } = await params;

	return <ProjectEditClient id={id} />;
}
