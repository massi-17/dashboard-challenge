import type { Permission, ProjectStatus, UserRole } from '@/types';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
	MANAGER: [
		'project:create',
		'project:edit',
		'project:delete',
		'project:activate',
		'project:archive',
		'project:restore',
		'project:view',
	],
	VIEWER: ['project:view'],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
	return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canPerformAction(
	role: UserRole,
	action: Permission,
	projectStatus?: ProjectStatus,
): boolean {
	if (!hasPermission(role, action)) {
		return false;
	}

	if (projectStatus) {
		switch (action) {
			case 'project:activate':
				return projectStatus === 'Draft';
			case 'project:archive':
				return projectStatus === 'Active';
			case 'project:restore':
				return projectStatus === 'Archived';
			case 'project:edit':
				return projectStatus !== 'Archived';
			default:
				return true;
		}
	}

	return true;
}
