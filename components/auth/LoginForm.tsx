'use client';

import { Button } from '@/components/ui/Button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function LoginForm() {
	const login = useAuthStore((state) => state.login);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		try {
			await login(data.email, data.password);
			toast.success('Login successful');
			router.push('/dashboard');
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Error during login',
			);
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="email@example.com"
									disabled={isLoading}
									variant="elevated"
									className="px-4 py-3"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="••••••••"
									disabled={isLoading}
									variant="elevated"
									className="px-4 py-3"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					variant="cta"
					disabled={isLoading}
					className="w-full mt-2 text-base font-semibold shadow-lg"
				>
					{isLoading ? 'Logging in...' : 'Login'}
				</Button>
			</form>
		</Form>
	);
}
