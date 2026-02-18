import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
			<h1 className="mb-2 text-6xl font-bold text-foreground">404</h1>
			<h2 className="mb-4 text-2xl font-semibold text-foreground">
				Page Not Found
			</h2>
			<p className="mb-8 max-w-md text-muted-foreground">
				The resource you are looking for does not exist or has been moved.
			</p>
			<Link
				href="/dashboard"
				className="rounded-lg bg-primary px-6 py-3 font-medium text-[var(--on-color)] transition-colors hover:bg-primary/90"
			>
				Back to Dashboard
			</Link>
		</div>
	);
}
