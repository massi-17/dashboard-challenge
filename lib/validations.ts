import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().min(1, 'Email is required').email(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]/,
			'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
		),
});

export const projectSchema = z.object({
	name: z
		.string()
		.min(1, 'Name is required')
		.min(3, 'Name must be at least 3 characters')
		.max(100, 'Name cannot exceed 100 characters'),
	description: z
		.string()
		.max(500, 'Description cannot exceed 500 characters')
		.optional(),
	status: z.enum(['Draft', 'Active', 'Archived'], {
		message: 'Invalid status',
	}),
});

export const projectCreateSchema = projectSchema;

export const projectEditSchema = z.object({
	name: z
		.string()
		.min(3, 'Name must be at least 3 characters')
		.max(100, 'Name cannot exceed 100 characters')
		.optional(),
	description: z
		.string()
		.max(500, 'Description cannot exceed 500 characters')
		.optional(),
	status: z
		.enum(['Draft', 'Active', 'Archived'], {
			message: 'Invalid status',
		})
		.optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type ProjectCreateFormData = z.infer<typeof projectCreateSchema>;
