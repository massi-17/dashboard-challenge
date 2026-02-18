export default function Loading() {
	return (
		<div className="space-y-6" aria-busy="true" aria-live="polite">
			<div className="h-6 w-32 bg-[var(--muted-text)]/20 animate-pulse" />

			<div className="space-y-6">
				<div className="space-y-2 mb-6">
					<div className="h-9 bg-[var(--primary)]/20 w-64 animate-pulse" />
					<div className="h-5 bg-[var(--secondary-text)]/20 w-80 animate-pulse" />
				</div>

				<div className="space-y-6 max-w-2xl">
					<div className="space-y-2">
						<div className="h-4 w-16 bg-[var(--muted-text)]/30 animate-pulse" />
						<div className="h-11 bg-[var(--input)]/30 border border-[var(--border)]/50 w-full animate-pulse rounded-2xl" />
					</div>

					<div className="space-y-2">
						<div className="h-4 w-24 bg-[var(--muted-text)]/30 animate-pulse" />
						<div className="h-32 bg-[var(--input)]/30 border border-[var(--border)]/50 w-full animate-pulse rounded-2xl" />
					</div>

					<div className="space-y-2">
						<div className="h-4 w-16 bg-[var(--muted-text)]/30 animate-pulse" />
						<div className="h-11 bg-[var(--input)]/30 border border-[var(--border)]/50 w-48 animate-pulse rounded-2xl" />
					</div>

					<div className="flex gap-3">
						<div className="h-11 w-32 bg-[var(--accent)]/20 border border-[var(--accent)]/20 animate-pulse rounded-2xl" />
						<div className="h-11 w-24 bg-[var(--muted)]/30 border border-[var(--border)]/50 animate-pulse rounded-2xl" />
					</div>
				</div>
			</div>
		</div>
	);
}
