import { MOCK_USERS_WITH_PASSWORD } from '@/lib/api/mockUsersData';
import { resetProjectsToDefaults } from '@/lib/api/projects';
import {
	generateAccessToken,
	generateRefreshToken,
	shouldRefreshAccessToken,
} from '@/lib/auth/tokens';
import type { User } from '@/types';
import { create } from 'zustand';

interface AuthState {
	user: User | null;
	accessToken: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	setLoading: (loading: boolean) => void;
	initializeAuth: () => Promise<void>;
	refreshAccessToken: () => Promise<void>;
	getValidAccessToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	accessToken: null,
	isAuthenticated: false,
	isLoading: false,

	initializeAuth: async () => {
		try {
			const response = await fetch('/api/auth/refresh', {
				method: 'POST',
				credentials: 'include',
			});

			if (response.ok) {
				const data = await response.json();
				set({
					user: data.user,
					accessToken: data.accessToken,
					isAuthenticated: true,
				});
			} else {
				set({
					user: null,
					accessToken: null,
					isAuthenticated: false,
				});
			}
		} catch (error) {
			console.error('Error initializing auth:', error);
			set({
				user: null,
				accessToken: null,
				isAuthenticated: false,
			});
		}
	},

	login: async (email: string, password: string) => {
		set({ isLoading: true });

		await new Promise((resolve) => setTimeout(resolve, 800));

		const mockUser = MOCK_USERS_WITH_PASSWORD[email];

		if (!mockUser || mockUser.password !== password) {
			set({ isLoading: false });
			throw new Error('Credenziali non valide');
		}

		const user = mockUser.user;

		const accessToken = generateAccessToken(user);

		const refreshToken = generateRefreshToken(user.id);

		document.cookie = `refresh-token=${refreshToken}; path=/; max-age=${3 * 24 * 60 * 60}; samesite=lax; secure`;

		set({
			user,
			accessToken,
			isAuthenticated: true,
			isLoading: false,
		});
	},

	logout: () => {
		document.cookie = 'refresh-token=; path=/; max-age=0; samesite=lax; secure';

		if (typeof window !== 'undefined') {
			try {
				resetProjectsToDefaults();
			} catch (error) {
				console.error('Failed to reset projects on logout:', error);
			}
		}

		set({
			user: null,
			accessToken: null,
			isAuthenticated: false,
		});
	},

	refreshAccessToken: async () => {
		try {
			const response = await fetch('/api/auth/refresh', {
				method: 'POST',
				credentials: 'include',
			});

			if (response.ok) {
				const data = await response.json();
				set({
					user: data.user,
					accessToken: data.accessToken,
					isAuthenticated: true,
				});
			} else {
				get().logout();
			}
		} catch (error) {
			console.error('Error refreshing access token:', error);
			get().logout();
		}
	},

	getValidAccessToken: async (): Promise<string | null> => {
		const { accessToken, refreshAccessToken } = get();

		if (!accessToken) {
			return null;
		}

		if (shouldRefreshAccessToken(accessToken)) {
			await refreshAccessToken();
			return get().accessToken;
		}

		return accessToken;
	},

	setLoading: (loading: boolean) => {
		set({ isLoading: loading });
	},
}));
