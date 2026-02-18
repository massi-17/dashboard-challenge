import { useAuthStore } from '@/store/auth';
import { useEffect, useRef } from 'react';

export function useAutoRefreshToken() {
	const accessToken = useAuthStore((state) => state.accessToken);
	const refreshAccessToken = useAuthStore((state) => state.refreshAccessToken);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!isAuthenticated || !accessToken) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			return;
		}

		intervalRef.current = setInterval(async () => {
			try {
				const payload = JSON.parse(atob(accessToken));
				const fiveMinutes = 5 * 60 * 1000;

				if (payload.exp - Date.now() < fiveMinutes) {
					await refreshAccessToken();
				}
			} catch (error) {
				console.error('Error checking token expiry:', error);
				await refreshAccessToken();
			}
		}, 60 * 1000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isAuthenticated, accessToken, refreshAccessToken]);
}
