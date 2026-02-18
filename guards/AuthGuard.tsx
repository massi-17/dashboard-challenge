'use client';

import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

interface AuthGuardProps {
	children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const initializeAuth = useAuthStore((state) => state.initializeAuth);
	const router = useRouter();
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const initialize = async () => {
			await initializeAuth();
			setIsInitialized(true);
		};
		initialize();
	}, [initializeAuth]);

	useEffect(() => {
		if (isInitialized && !isAuthenticated) {
			router.push('/login');
		}
	}, [isAuthenticated, isInitialized, router]);

	if (!isInitialized) {
		return null;
	}

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
}
