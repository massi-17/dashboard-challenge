import type { ProjectStatus } from '@/types';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-primary text-[var(--on-color)] hover:bg-primary/80',
				secondary:
					'border-transparent bg-secondary text-[var(--on-color)] hover:bg-secondary/80',
				destructive:
					'border-transparent bg-destructive text-[var(--on-color)] hover:bg-destructive/80',
				outline: 'text-foreground',
				Draft:
					'border-amber-500/20 bg-amber-500/10 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.2)]',
				Active:
					'border-green-500/20 bg-green-500/10 text-green-300 shadow-[0_0_10px_rgba(34,197,94,0.2)]',
				Archived: 'border-slate-500/20 bg-slate-500/10 text-slate-400',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface BadgeProps
	extends
		React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {
	status?: ProjectStatus;
}

function Badge({ className, variant, status, ...props }: BadgeProps) {
	const badgeVariant = status || variant;
	return (
		<div
			className={cn(badgeVariants({ variant: badgeVariant as any, className }))}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
