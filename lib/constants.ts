import type { ProjectStatus } from '@/types';

export interface StatusOption {
	value: ProjectStatus | 'all';
	label: string;
}

export const PROJECT_STATUS_OPTIONS: readonly StatusOption[] = [
	{ value: 'all' as const, label: 'All statuses' },
	{ value: 'Draft' as ProjectStatus, label: 'Draft' },
	{ value: 'Active' as ProjectStatus, label: 'Active' },
	{ value: 'Archived' as ProjectStatus, label: 'Archived' },
] as const;

export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
} as const;

export const DATETIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
} as const;

export const DEFAULT_LOCALE = 'en-US' as const;
