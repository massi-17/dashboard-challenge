import type { Project, ProjectStatus } from '@/types';
import {
	BarChart3,
	FileText,
	FolderArchive,
	FolderOpen,
	type LucideIcon,
} from 'lucide-react';
import { memo, useMemo } from 'react';

interface StatsProps {
	projects: Project[];
	onStatusClick: (status: ProjectStatus | 'all') => void;
	currentFilter: ProjectStatus | 'all';
}

const StatIcon = ({
	icon: Icon,
	color,
}: {
	icon: LucideIcon;
	color: string;
}) => <Icon className="h-6 w-6" style={{ color }} aria-hidden="true" />;

const STAT_CONFIG = {
	all: {
		icon: FolderOpen,
		label: 'All Projects',
		gradient: 'from-[var(--primary)]/30 to-[var(--card)]/10',
		color: 'var(--primary-light)',
	},
	Active: {
		icon: BarChart3,
		label: 'Active Projects',
		gradient: 'from-[var(--secondary)]/20 to-[var(--primary)]/10',
		color: 'var(--secondary)',
	},
	Draft: {
		icon: FileText,
		label: 'Draft Projects',
		gradient: 'from-[var(--muted-text)]/20 to-[var(--primary)]/10',
		color: 'var(--muted-text)',
	},
	Archived: {
		icon: FolderArchive,
		label: 'Archived Projects',
		gradient: 'from-[var(--muted)]/50 to-[var(--primary)]/10',
		color: 'var(--secondary-text)',
	},
} as const;

const getButtonClass = (gradient: string, isActive: boolean) =>
	`relative rounded-2xl p-6 sm:p-7 md:p-8 bg-gradient-to-br ${gradient} ` +
	`transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.03] ` +
	`hover:shadow-2xl border shadow-lg group overflow-hidden cursor-pointer text-left w-full ` +
	`${
		isActive
			? 'border-[var(--primary)] shadow-[0_0_16px_hsl(var(--primary)/0.3)] ring-2 ring-[var(--primary)]/50'
			: 'border-border'
	}`;

export const Stats = memo<StatsProps>(function Stats({
	projects,
	onStatusClick,
	currentFilter,
}) {
	const counts = useMemo(() => {
		const active = projects.filter((p) => p.status === 'Active').length;
		const draft = projects.filter((p) => p.status === 'Draft').length;
		const archived = projects.filter((p) => p.status === 'Archived').length;
		const total = projects.length;
		return { active, draft, archived, total };
	}, [projects]);

	const stats = [
		{
			...STAT_CONFIG.all,
			value: counts.total,
			status: 'all' as const,
		},
		{
			...STAT_CONFIG.Active,
			value: counts.active,
			status: 'Active' as ProjectStatus,
		},
		{
			...STAT_CONFIG.Draft,
			value: counts.draft,
			status: 'Draft' as ProjectStatus,
		},
		{
			...STAT_CONFIG.Archived,
			value: counts.archived,
			status: 'Archived' as ProjectStatus,
		},
	];
	return (
		<div className="pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
			{stats.map((s) => {
				const isActive = currentFilter === s.status;
				return (
					<button
						key={s.label}
						onClick={() => onStatusClick(s.status)}
						aria-label={`Filter by ${s.label.toLowerCase()}`}
						aria-pressed={isActive}
						className={getButtonClass(s.gradient, isActive)}
					>
						<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
						<div className="flex items-center gap-2 sm:gap-3">
							<span className="text-lg sm:text-xl">
								<StatIcon icon={s.icon} color={s.color} />
							</span>
							<span
								className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-[0_0_8px_hsl(var(--primary))]"
								style={{ color: s.color }}
							>
								{s.value}
							</span>
						</div>
						<div className="mt-2 text-sm sm:text-base text-white/80 font-medium">
							{s.label}
						</div>
					</button>
				);
			})}
		</div>
	);
});
