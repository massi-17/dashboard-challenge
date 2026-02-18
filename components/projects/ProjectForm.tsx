import { Button } from '@/components/ui/Button';
import { FieldError } from '@/components/ui/FieldError';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { PROJECT_STATUS_OPTIONS } from '@/lib/constants';
import {
	projectCreateSchema,
	projectEditSchema,
	type ProjectCreateFormData,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

interface ProjectFormProps {
	defaultValues?: Partial<ProjectCreateFormData>;
	onSubmit: (data: ProjectCreateFormData) => void;
	isLoading?: boolean;
	submitLabel?: string;
	mode?: 'create' | 'edit';
}

export function ProjectForm({
	defaultValues,
	onSubmit,
	isLoading = false,
	submitLabel = 'Save',
	mode = 'create',
}: ProjectFormProps) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isDirty },
	} = useForm<ProjectCreateFormData>({
		resolver: zodResolver(projectCreateSchema),
		defaultValues: defaultValues || {
			name: '',
			description: '',
			status: 'Draft',
		},
	});

	const isSubmitDisabled = isLoading || (mode === 'edit' && !isDirty);

	const handleFormSubmit = (data: ProjectCreateFormData) => {
		if (mode === 'edit') {
			const changedData: Partial<ProjectCreateFormData> = {};
			if (data.name !== defaultValues?.name) changedData.name = data.name;
			if (data.description !== defaultValues?.description)
				changedData.description = data.description;
			if (data.status !== defaultValues?.status)
				changedData.status = data.status;

			const result = projectEditSchema.safeParse(changedData);
			if (!result.success) {
				console.error('Edit validation failed:', result.error);
				return;
			}

			onSubmit(changedData as ProjectCreateFormData);
		} else {
			onSubmit(data);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="name">Project Name {mode === 'create' && '*'}</Label>
				<Input
					id="name"
					type="text"
					placeholder="Title..."
					{...register('name')}
					disabled={isLoading}
				/>
				<FieldError error={errors.name} />
			</div>

			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Textarea
					id="description"
					placeholder="Project description..."
					rows={4}
					{...register('description')}
					disabled={isLoading}
				/>
				<FieldError error={errors.description} />
			</div>

			<div className="space-y-2">
				<Label htmlFor="status">Status {mode === 'create' && '*'}</Label>
				<Controller
					name="status"
					control={control}
					render={({ field }) => (
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							disabled={isLoading}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a status" />
							</SelectTrigger>
							<SelectContent>
								{PROJECT_STATUS_OPTIONS.filter(
									(opt) => opt.value !== 'all',
								).map((opt) => (
									<SelectItem key={opt.value} value={opt.value}>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
				<FieldError error={errors.status} />
			</div>

			<div className="flex items-center gap-3">
				<Button type="submit" variant="cta" disabled={isSubmitDisabled}>
					{isLoading ? 'Saving...' : submitLabel}
				</Button>
				<Button
					type="button"
					variant="ghost"
					className="h-11 sm:h-12"
					onClick={() => router.back()}
					disabled={isLoading}
				>
					Cancel
				</Button>
			</div>
		</form>
	);
}
