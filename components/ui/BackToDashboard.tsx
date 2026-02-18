import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from './Button';

export function BackToDashboard() {
	return (
		<Button
			asChild
			variant="ghost"
			className="text-primary hover:text-primary/80 cursor-pointer"
			aria-label="Go to dashboard"
		>
			<Link href="/dashboard">
				<ArrowLeft className="w-4 h-4" aria-hidden="true" />
				Back to Dashboard
			</Link>
		</Button>
	);
}
