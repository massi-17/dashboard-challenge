'use client';

import { DashboardFooter } from '@/components/layout/DashboardFooter';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AuthGuard } from '@/guards/AuthGuard';
import { useAutoRefreshToken } from '@/hooks/useAutoRefreshToken';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useAutoRefreshToken();

	return (
		<AuthGuard>
			<div className="flex min-h-screen flex-col">
				<DashboardHeader />
				<main className="flex-1 container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
					{children}
				</main>
				<DashboardFooter />
			</div>
		</AuthGuard>
	);
}
