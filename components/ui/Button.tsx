import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
	{
		variants: {
			variant: {
				default: 'bg-primary text-[var(--on-color)] hover:bg-primary/90',
				destructive:
					'bg-destructive text-[var(--on-color)] hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-[var(--on-color)]',
				secondary: 'bg-secondary text-[var(--on-color)] hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-[var(--on-color)]',
				link: 'text-primary underline-offset-4 hover:underline',
				primary: 'bg-primary text-[var(--on-color)] hover:bg-primary/90',
				solid:
					'relative z-0 font-semibold rounded-2xl border border-primary bg-gradient-to-br from-card via-card to-primary/30 text-white shadow-none px-5 py-3 transition-all duration-150 overflow-hidden flex items-center justify-center text-center before:absolute before:inset-0 before:rounded-2xl before:bg-none before:opacity-0 hover:border-[hsl(var(--primary-light))] hover:bg-background/80 focus-visible:border-[hsl(var(--primary-light))] focus-visible:shadow-[0_0_0_2px_hsl(var(--primary-light))] active:scale-[0.98] active:shadow-none',
				cta: 'h-11 sm:h-12 px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-purple-700 !text-white font-semibold shadow-lg hover:brightness-110 hover:saturate-125 hover:!text-white focus-visible:ring-2 focus-visible:ring-primary transition-all duration-500 ease-out [&]:!text-white',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
				md: 'h-10 px-4 py-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
