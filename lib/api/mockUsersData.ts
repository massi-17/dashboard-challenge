import type { User } from '@/types';

export const MOCK_USERS_WITH_PASSWORD: Record<
	string,
	{ password: string; user: User }
> = {
	'manager@example.com': {
		password: 'Password#123',
		user: {
			id: '1',
			email: 'manager@example.com',
			name: 'Manager User',
			role: 'MANAGER',
		},
	},
	'viewer@example.com': {
		password: 'Password#123',
		user: {
			id: '2',
			email: 'viewer@example.com',
			name: 'Viewer User',
			role: 'VIEWER',
		},
	},
};

export const MOCK_USERS_BY_ID: Record<string, User> = {
	'1': {
		id: '1',
		email: 'manager@example.com',
		name: 'Manager User',
		role: 'MANAGER',
	},
	'2': {
		id: '2',
		email: 'viewer@example.com',
		name: 'Viewer User',
		role: 'VIEWER',
	},
};
