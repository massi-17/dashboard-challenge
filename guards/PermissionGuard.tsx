'use client';

import { ErrorState } from '@/components/ui/ErrorState';
import { canPerformAction } from '@/lib/permissions';
import { useAuthStore } from '@/store/auth';
import type { Permission, ProjectStatus } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

interface PermissionGuardProps {
	children: ReactNode;
	permission: Permission;
	projectStatus?: ProjectStatus;
	fallback?: ReactNode;
	redirectTo?: string;
}

export function PermissionGuard({
	children,
	permission,
	projectStatus,
	fallback,
	redirectTo,
}: PermissionGuardProps) {
	const user = useAuthStore((state) => state.user);
	const router = useRouter();

	const hasAccess = user
		? canPerformAction(user.role, permission, projectStatus)
		: false;

	useEffect(() => {
		if (!hasAccess && redirectTo) {
			router.push(redirectTo);
		}
	}, [hasAccess, redirectTo, router]);

	if (!hasAccess) {
		if (redirectTo) {
			return null;
		}
		return (
			<>
				{fallback !== undefined ? (
					fallback
				) : (
					<ErrorState variant="access-denied" />
				)}
			</>
		);
	}

	return <>{children}</>;
}
