import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { InputHTMLAttributes, forwardRef } from 'react';

const inputVariants = cva(
	'flex h-11 w-full rounded-2xl px-4 py-2 text-sm text-[var(--foreground)] ring-offset-background placeholder:text-[var(--muted-text)] focus:outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'border border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
				elevated:
					'border border-card bg-gradient-to-br from-background to-card shadow-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface InputProps
	extends
		InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputVariants({ variant, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };
