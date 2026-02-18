interface PageHeaderProps {
	title: string;
	description?: string;
	gradient?: boolean;
}

/**
 * Atomic header component for pages
 * Reusable for all pages that need title + description
 */
export function PageHeader({
	title,
	description,
	gradient = false,
}: PageHeaderProps) {
	return (
		<div className="sm:space-y-3 md:space-y-2 ">
			<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
				{gradient ? (
					<span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
						{title}
					</span>
				) : (
					title
				)}
			</h2>
			{description && (
				<p className="text-muted-foreground text-base sm:text-lg">
					{description}
				</p>
			)}
		</div>
	);
}
