'use client';

import { canPerformAction } from '@/lib/permissions';
import { useAuthStore } from '@/store/auth';
import type { Permission, ProjectStatus } from '@/types';

export function usePermission() {
	const user = useAuthStore((state) => state.user);

	const can = (permission: Permission, projectStatus?: ProjectStatus) => {
		if (!user) return false;
		return canPerformAction(user.role, permission, projectStatus);
	};

	const cannot = (permission: Permission, projectStatus?: ProjectStatus) => {
		return !can(permission, projectStatus);
	};

	return { can, cannot, role: user?.role };
}
