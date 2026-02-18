import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function ProjectLoadingSkeleton({ count = 3 }: { count?: number }) {
	return (
		<ul className="flex flex-col gap-4 sm:gap-6 md:gap-8">
			{Array.from({ length: count }).map((_, i) => (
				<li key={i}>
					<Card className="group relative flex flex-col p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-background to-card border-card shadow-lg transition-all duration-300">
						<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
						<div className="relative p-0 pb-3 sm:pb-4">
							<div className="flex items-start justify-between gap-3 sm:gap-4">
								<Skeleton className="h-6 sm:h-7 w-3/4" />
								<Skeleton className="h-6 w-20" />
							</div>
							<Skeleton className="h-4 w-full mt-2 sm:mt-3" />
							<Skeleton className="h-4 w-2/3 mt-2" />
						</div>
						<div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-card">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-9 w-24" />
						</div>
					</Card>
				</li>
			))}
		</ul>
	);
}
