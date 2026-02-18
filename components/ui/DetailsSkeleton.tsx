export function DetailsSkeleton() {
	return (
		<>
			<div className="space-y-3 mb-6">
				<div className="h-9 bg-[var(--primary)]/20 w-3/4 animate-pulse rounded" />
				<div className="h-6 w-20 bg-[var(--accent)]/20 animate-pulse rounded" />
			</div>
			<div className="space-y-2">
				<div className="h-4 w-24 bg-[var(--muted-text)]/30 animate-pulse rounded" />
				<div className="h-4 bg-[var(--secondary-text)]/20 w-full animate-pulse rounded" />
				<div className="h-4 bg-[var(--secondary-text)]/20 w-full animate-pulse rounded" />
				<div className="h-4 bg-[var(--secondary-text)]/20 w-2/3 animate-pulse rounded" />
			</div>
		</>
	);
}
