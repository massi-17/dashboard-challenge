import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isLoading?: boolean;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	isLoading = false,
}: PaginationProps) {
	const canGoPrevious = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="flex items-center justify-center gap-2 mt-8">
			<Button
				variant="outline"
				size="sm"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={!canGoPrevious || isLoading}
				className="h-9"
				aria-label="Go to previous page"
			>
				<ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" />
				Previous
			</Button>

			<div className="flex items-center gap-2 px-4">
				<span className="text-sm text-muted-foreground">
					Page{' '}
					<span className="font-medium text-foreground">{currentPage}</span> of{' '}
					<span className="font-medium text-foreground">{totalPages}</span>
				</span>
			</div>

			<Button
				variant="outline"
				size="sm"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={!canGoNext || isLoading}
				className="h-9"
				aria-label="Go to next page"
			>
				Next
				<ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
			</Button>
		</div>
	);
}
