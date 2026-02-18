import { SearchX } from 'lucide-react';
import Link from 'next/link';

export default function DashboardNotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<SearchX
				className="mb-6 h-24 w-24 text-muted-foreground"
				strokeWidth={1.5}
				aria-hidden="true"
			/>
			<h2 className="mb-3 text-3xl font-bold text-[var(--primary)]">
				Risorsa non trovata
			</h2>
			<p className="mb-8 max-w-lg text-lg text-muted-foreground">
				The project you are looking for does not exist. It may have been deleted
				or the URL is incorrect.
			</p>
			<Link
				href="/dashboard"
				className="rounded-lg bg-primary px-6 py-3 font-medium text-[var(--on-color)] transition-colors hover:bg-primary/90"
			>
				← Back to Dashboard
			</Link>
		</div>
	);
}
