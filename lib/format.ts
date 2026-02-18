import {
	DATE_FORMAT_OPTIONS,
	DATETIME_FORMAT_OPTIONS,
	DEFAULT_LOCALE,
} from './constants';

export function formatDate(date: string | Date, includeTime = false): string {
	const dateObj = typeof date === 'string' ? new Date(date) : date;
	const options = includeTime ? DATETIME_FORMAT_OPTIONS : DATE_FORMAT_OPTIONS;
	return dateObj.toLocaleDateString(DEFAULT_LOCALE, options);
}
