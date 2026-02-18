import { StatusFilter } from '@/components/projects/StatusFilter';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Input } from '@/components/ui/Input';
import { resetProjectsToDefaults } from '@/lib/api/projects';
import type { ProjectStatus } from '@/types';
import { Plus, RotateCcw, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ProjectsToolbarProps {
	searchQuery: string;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	statusFilter: ProjectStatus | 'all';
	onStatusFilterChange: (value: ProjectStatus | 'all') => void;
	canCreateProject?: boolean;
}

export function ProjectsToolbar({
	searchQuery,
	onSearchChange,
	statusFilter,
	onStatusFilterChange,
	canCreateProject = false,
}: ProjectsToolbarProps) {
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

	const handleResetData = () => {
		resetProjectsToDefaults();
		setIsResetDialogOpen(false);
		window.location.reload();
	};

	return (
		<div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
			<div className="relative flex-1 w-full sm:max-w-md">
				<Input
					value={searchQuery}
					onChange={onSearchChange}
					placeholder="Search projects..."
					aria-label="Search projects by name"
					className="pr-10"
				/>
				{searchQuery && (
					<button
						onClick={() =>
							onSearchChange({
								target: { value: '' },
							} as React.ChangeEvent<HTMLInputElement>)
						}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Clear search"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>

			<div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
				<div className="w-full sm:w-auto">
					<StatusFilter
						value={statusFilter}
						onChange={onStatusFilterChange}
						ariaLabel="Filter by status"
					/>
				</div>

				{canCreateProject && (
					<Button variant="cta" asChild className="w-full sm:w-auto">
						<Link href="/projects/new">
							<Plus className="h-4 w-4 mr-2" />
							New Project
						</Link>
					</Button>
				)}

				<ConfirmDialog
					title="Reset Mockup Data"
					description="This will reset all demo data to defaults. All your changes will be removed. This action cannot be undone."
					ctaLabel="Reset Data"
					onConfirm={handleResetData}
					open={isResetDialogOpen}
					onOpenChange={setIsResetDialogOpen}
				>
					<Button variant="secondary" size="lg" className="w-full sm:w-auto">
						<RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
						Reset Mockup Data
					</Button>
				</ConfirmDialog>
			</div>
		</div>
	);
}
