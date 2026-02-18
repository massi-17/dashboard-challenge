'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardFooter, CardHeader } from '@/components/ui/Card';
import { usePermission } from '@/hooks/usePermission';
import { formatDate } from '@/lib/format';
import type { Project } from '@/types';
import {
	BarChart3,
	Calendar,
	Edit,
	Eye,
	FileText,
	FolderArchive,
} from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

interface ProjectCardProps {
	project: Project;
}

export const ProjectCard = memo<ProjectCardProps>(function ProjectCard({
	project,
}) {
	const { can } = usePermission();
	return (
		<Card className="group relative flex flex-col h-full p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-background to-card border-card shadow-lg transition-all duration-300 hover:scale-[1.005] hover:shadow-2xl overflow-hidden">
			<CardHeader className="relative p-0 pb-3 sm:pb-4 flex-1">
				<div className="flex items-start justify-between gap-3 sm:gap-4">
					<div className="flex items-center gap-2 sm:gap-3 min-w-0">
						{project.status === 'Active' && (
							<BarChart3
								className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 shrink-0"
								aria-hidden="true"
							/>
						)}
						{project.status === 'Draft' && (
							<FileText
								className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 shrink-0"
								aria-hidden="true"
							/>
						)}
						{project.status === 'Archived' && (
							<FolderArchive
								className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400 shrink-0"
								aria-hidden="true"
							/>
						)}

						<span className="text-2xl sm:text-3xl font-extrabold text-primary truncate">
							{project.name}
						</span>
					</div>
					<Badge
						status={project.status}
						className="ring-1 ring-inset ring-card/60"
					>
						{project.status}
					</Badge>
				</div>
				<p className="text-xs sm:text-sm text-slate-300 mt-2 sm:mt-3 leading-relaxed">
					{project.description}
				</p>
			</CardHeader>
			<CardFooter className="flex items-center justify-between p-0 pt-3 sm:pt-4 border-t border-card gap-3">
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<Calendar className="h-3.5 w-3.5" aria-hidden="true" />
					<span className="font-medium">{formatDate(project.createdAt)}</span>
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					<Link href={`/projects/${project.id}`}>
						<Button
							variant="secondary"
							size="sm"
							aria-label={`View details for ${project.name}`}
						>
							<Eye className="w-4 h-4" aria-hidden="true" />
							Details
						</Button>
					</Link>
					{can('project:edit', project.status) && (
						<Link href={`/projects/${project.id}/edit`}>
							<Button
								variant="secondary"
								size="sm"
								aria-label={`Edit ${project.name}`}
							>
								<Edit className="w-4 h-4" aria-hidden="true" />
								Edit
							</Button>
						</Link>
					)}
				</div>
			</CardFooter>
		</Card>
	);
});
