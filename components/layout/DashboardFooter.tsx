'use client';

export function DashboardFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t py-4">
			<div className="flex items-center justify-center w-full">
				<p className="text-xs sm:text-sm text-muted-foreground text-center">
					© {currentYear} SaaS Project Dashboard by Silvia Massimiani
				</p>
			</div>
		</footer>
	);
}
