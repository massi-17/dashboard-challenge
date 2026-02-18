import { useEffect, useState } from 'react';

const DEBOUNCE_DELAY = 400;

interface UseDebounceOptions {
	initialValue: string;
}

export function useDebounce({ initialValue }: UseDebounceOptions) {
	const [searchInput, setSearchInput] = useState(initialValue);
	const [debouncedSearch, setDebouncedSearch] = useState(initialValue);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(searchInput);
		}, DEBOUNCE_DELAY);

		return () => clearTimeout(handler);
	}, [searchInput]);

	return { searchInput, setSearchInput, debouncedSearch };
}
