import type { FieldError as FormFieldError } from 'react-hook-form';

interface FieldErrorProps {
	error?: FormFieldError;
}

export function FieldError({ error }: FieldErrorProps) {
	if (!error?.message) return null;

	return (
		<p className="text-sm text-red-500" role="alert">
			{error.message}
		</p>
	);
}
