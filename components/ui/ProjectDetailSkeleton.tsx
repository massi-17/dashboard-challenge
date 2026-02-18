export function ProjectDetailSkeleton() {
	return (
		<div className="space-y-6" aria-busy="true" aria-live="polite">
			<div className="h-6 w-32 bg-[var(--muted-text)]/20 animate-pulse rounded" />

			<div className="space-y-6">
				<div className="flex items-start justify-between gap-4 mb-6">
					<div className="flex-1 space-y-3">
						<div className="h-9 bg-[var(--primary)]/20 w-3/4 animate-pulse rounded" />
						<div className="h-6 w-20 bg-[var(--accent)]/20 animate-pulse rounded" />
					</div>
				</div>

				<div className="space-y-2">
					<div className="h-4 w-24 bg-[var(--muted-text)]/30 animate-pulse rounded" />
					<div className="h-4 bg-[var(--secondary-text)]/20 w-full animate-pulse rounded" />
					<div className="h-4 bg-[var(--secondary-text)]/20 w-full animate-pulse rounded" />
					<div className="h-4 bg-[var(--secondary-text)]/20 w-2/3 animate-pulse rounded" />
				</div>

				<div className="p-6 rounded-lg bg-[var(--muted)] border border-[var(--border)]">
					<div className="h-3 w-24 bg-[var(--muted-text)]/30 animate-pulse rounded mb-2" />
					<div className="h-4 w-32 bg-[var(--secondary-text)]/20 animate-pulse rounded" />
				</div>

				<div className="pt-6 border-t border-[var(--border)]">
					<div className="h-4 w-40 bg-[var(--muted-text)]/30 animate-pulse rounded mb-4" />
					<div className="flex gap-3">
						<div className="h-10 w-24 bg-[var(--accent)]/20 animate-pulse rounded-lg" />
						<div className="h-10 w-28 bg-[var(--accent)]/20 animate-pulse rounded-lg" />
					</div>
				</div>
			</div>
		</div>
	);
}
