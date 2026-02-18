'use client';

import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { useAuthStore } from '@/store/auth';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function DashboardHeader() {
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push('/login');
	};

	return (
		<header className="relative z-10 flex items-center justify-between py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
			<Link href="/dashboard" className="cursor-pointer">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-400 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_2px_16px_hsl(var(--primary)/0.8)]">
					Projects
				</h1>
				<p className="text-xs sm:text-sm text-muted-foreground mt-1">
					Dashboard
				</p>
			</Link>
			<div className="flex items-center gap-2 sm:gap-3 md:gap-4">
				{user && <UserAvatar user={user} />}
				<Button
					variant="cta"
					onClick={handleLogout}
					aria-label="Logout from dashboard"
				>
					<LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
					Logout
				</Button>
			</div>
		</header>
	);
}
