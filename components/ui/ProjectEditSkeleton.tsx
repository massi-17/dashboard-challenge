export function ProjectEditSkeleton() {
	return (
		<div className="space-y-6" aria-busy="true" aria-live="polite">
			<div className="h-6 w-32 bg-[var(--muted-text)]/20 animate-pulse rounded" />

			<div className="space-y-6">
				<div className="space-y-2">
					<div className="h-9 bg-[var(--primary)]/20 w-1/3 animate-pulse rounded" />
					<div className="h-4 bg-[var(--secondary-text)]/20 w-1/4 animate-pulse rounded" />
				</div>

				<div className="space-y-6">
					<div className="space-y-2">
						<div className="h-4 w-16 bg-[var(--muted-text)]/30 animate-pulse rounded" />
						<div className="h-11 bg-card/50 animate-pulse rounded-2xl" />
					</div>
					<div className="space-y-2">
						<div className="h-4 w-24 bg-[var(--muted-text)]/30 animate-pulse rounded" />
						<div className="h-32 bg-card/50 animate-pulse rounded-2xl" />
					</div>
					<div className="space-y-2">
						<div className="h-4 w-16 bg-[var(--muted-text)]/30 animate-pulse rounded" />
						<div className="h-11 bg-card/50 animate-pulse rounded-2xl" />
					</div>
					<div className="flex gap-3">
						<div className="h-11 w-32 bg-primary/20 animate-pulse rounded-xl" />
						<div className="h-11 w-24 bg-accent/20 animate-pulse rounded-md" />
					</div>
				</div>
			</div>
		</div>
	);
}
