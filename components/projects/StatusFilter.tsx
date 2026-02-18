import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';
import { PROJECT_STATUS_OPTIONS } from '@/lib/constants';
import type { ProjectStatus } from '@/types';

interface StatusFilterProps {
	value: ProjectStatus | 'all';
	onChange: (value: ProjectStatus | 'all') => void;
	ariaLabel?: string;
}

export function StatusFilter({
	value,
	onChange,
	ariaLabel = 'Filter by status',
}: StatusFilterProps) {
	return (
		<Select
			value={value}
			onValueChange={(val) => onChange(val as ProjectStatus | 'all')}
		>
			<SelectTrigger className="h-11 sm:h-12 rounded-xl" aria-label={ariaLabel}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{PROJECT_STATUS_OPTIONS.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
