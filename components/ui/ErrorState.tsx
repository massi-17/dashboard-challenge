import { BackToDashboard } from '@/components/ui/BackToDashboard';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface ErrorStateProps {
	variant?: 'not-found' | 'access-denied';
	message?: string;
	showBackButton?: boolean;
}

export function ErrorState({
	variant = 'not-found',
	message,
	showBackButton = true,
}: ErrorStateProps) {
	const config = {
		'not-found': {
			icon: AlertTriangle,
			title: 'Resource Not Found',
			defaultMessage:
				'The requested resource does not exist or has been removed',
			iconColor: 'text-[var(--muted-text)]',
			bgColor: 'bg-[var(--muted)]/50',
			borderColor: 'border-[var(--border)]',
		},
		'access-denied': {
			icon: ShieldAlert,
			title: 'Access Denied',
			defaultMessage: 'You do not have permission to access this resource',
			iconColor: 'text-destructive',
			bgColor: 'bg-destructive/10',
			borderColor: 'border-destructive/20',
		},
	};

	const {
		icon: Icon,
		title,
		defaultMessage,
		iconColor,
		bgColor,
		borderColor,
	} = config[variant];
	const displayMessage = message || defaultMessage;

	return (
		<div className="flex items-center justify-center py-12">
			<div className="text-center space-y-6 max-w-md">
				<div className="flex justify-center">
					<div className={`p-4 rounded-full ${bgColor} border ${borderColor}`}>
						<Icon className={`h-12 w-12 ${iconColor}`} aria-hidden="true" />
					</div>
				</div>
				<div className="space-y-2">
					<h2 className="text-2xl font-bold text-[var(--primary)]">{title}</h2>
					<p className="text-[var(--secondary-text)]">{displayMessage}</p>
				</div>
				{showBackButton && <BackToDashboard />}
			</div>
		</div>
	);
}
