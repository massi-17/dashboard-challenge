export default function Loading() {
	return (
		<div
			className="space-y-8 pt-2 pb-6 sm:pb-8 md:pb-10"
			aria-busy="true"
			aria-live="polite"
		>
			<div className="space-y-2">
				<div className="h-10 bg-[var(--primary)]/20 w-72 animate-pulse" />
				<div className="h-5 bg-[var(--secondary-text)]/20 w-96 animate-pulse" />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				{[1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className="rounded-2xl border border-[var(--border)]/50 bg-card/50 p-6 space-y-3"
					>
						<div className="h-6 w-6 bg-[var(--accent)]/20 animate-pulse rounded" />
						<div className="h-8 bg-[var(--primary)]/20 w-16 animate-pulse" />
						<div className="h-4 bg-[var(--secondary-text)]/20 w-32 animate-pulse" />
					</div>
				))}
			</div>

			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-1 h-11 bg-[var(--input)]/30 border border-[var(--border)]/50 animate-pulse rounded-2xl" />
				<div className="h-11 bg-[var(--input)]/30 border border-[var(--border)]/50 w-full sm:w-48 animate-pulse rounded-2xl" />
			</div>

			<div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<div
						key={i}
						className="rounded-2xl sm:rounded-3xl border border-[var(--border)]/50 bg-card/50 p-6 sm:p-7 md:p-8"
					>
						<div className="flex items-start justify-between gap-3 sm:gap-4 pb-3 sm:pb-4">
							<div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
								<div className="h-7 w-7 sm:h-8 sm:w-8 bg-[var(--accent)]/20 animate-pulse rounded shrink-0" />
								<div className="h-8 sm:h-9 bg-[var(--primary)]/20 w-2/3 animate-pulse rounded" />
							</div>
							<div className="h-7 w-24 bg-[var(--accent)]/20 animate-pulse rounded shrink-0" />
						</div>

						<div className="space-y-2 mt-2 sm:mt-3">
							<div className="h-4 bg-[var(--secondary-text)]/20 w-full animate-pulse rounded" />
							<div className="h-4 bg-[var(--secondary-text)]/20 w-4/5 animate-pulse rounded" />
						</div>

						<div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[var(--border)]/50 gap-3">
							<div className="flex items-center gap-2">
								<div className="h-3.5 w-3.5 bg-[var(--muted-text)]/30 animate-pulse rounded" />
								<div className="h-4 w-24 bg-[var(--secondary-text)]/20 animate-pulse rounded" />
							</div>
							<div className="flex items-center gap-2">
								<div className="h-9 w-9 bg-[var(--accent)]/20 animate-pulse rounded-lg" />
								<div className="h-9 w-9 bg-[var(--accent)]/20 animate-pulse rounded-lg" />
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex items-center justify-center gap-2">
				<div className="h-9 w-28 bg-[var(--muted)]/30 border border-[var(--border)]/50 animate-pulse rounded-md" />
				<div className="h-5 w-32 bg-[var(--muted-text)]/20 animate-pulse rounded" />
				<div className="h-9 w-28 bg-[var(--muted)]/30 border border-[var(--border)]/50 animate-pulse rounded-md" />
			</div>
		</div>
	);
}
