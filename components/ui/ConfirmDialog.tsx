import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/Card';
import type { ReactNode } from 'react';

interface ConfirmDialogProps {
	children: ReactNode;
	title: string;
	description: string;
	ctaLabel: string;
	onConfirm: () => void;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

/**
 * Reusable confirmation dialog component
 * Uses AlertDialog with Card styling matching the design system
 */
export function ConfirmDialog({
	children,
	title,
	description,
	ctaLabel,
	onConfirm,
	open,
	onOpenChange,
}: ConfirmDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className="p-0 bg-transparent border-none shadow-none max-w-md">
				<AlertDialogTitle className="sr-only">{title}</AlertDialogTitle>
				<AlertDialogDescription className="sr-only">
					{description}
				</AlertDialogDescription>
				<Card className="bg-[var(--card)] border-[var(--border)] text-[var(--on-color)]">
					<CardHeader>
						<CardTitle>{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardFooter className="flex flex-row justify-end gap-2">
						<AlertDialogCancel className="min-w-[100px]">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction onClick={onConfirm} className="min-w-[100px]">
							{ctaLabel}
						</AlertDialogAction>
					</CardFooter>
				</Card>
			</AlertDialogContent>
		</AlertDialog>
	);
}
