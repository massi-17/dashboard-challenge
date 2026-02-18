export type UserRole = 'MANAGER' | 'VIEWER';

export type ProjectStatus = 'Draft' | 'Active' | 'Archived';

export type Permission =
	| 'project:create'
	| 'project:edit'
	| 'project:delete'
	| 'project:activate'
	| 'project:archive'
	| 'project:restore'
	| 'project:view';

export interface User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
}

export interface Project {
	id: string;
	name: string;
	description?: string;
	status: ProjectStatus;
	createdAt: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface PaginationParams {
	page: number;
	pageSize: number;
	search?: string;
	status?: ProjectStatus | 'all';
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}
