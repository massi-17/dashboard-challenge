'use client';

import { projectsApi } from '@/lib/api/projects';
import type { PaginationParams, Project, ProjectStatus } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const projectKeys = {
	all: ['projects'] as const,
	paginated: (params: PaginationParams) => ['projects', params] as const,
	detail: (id: string) => ['projects', id] as const,
};

export function useProjectsQuery(params: PaginationParams) {
	return useQuery({
		queryKey: projectKeys.paginated(params),
		queryFn: () => projectsApi.getProjects(params),
		placeholderData: (previousData) => previousData,
		staleTime: 30000,
	});
}

export function useProjectQuery(id: string) {
	return useQuery({
		queryKey: projectKeys.detail(id),
		queryFn: () => projectsApi.getById(id),
		enabled: !!id,
	});
}

export function useCreateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Omit<Project, 'id'>) => projectsApi.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
			toast.success('Project created successfully');
		},
		onError: (error: Error) => {
			toast.error(`Error: ${error.message}`);
		},
	});
}

export function useUpdateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: Partial<Omit<Project, 'id' | 'createdAt'>>;
		}) => projectsApi.update(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
			queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) });
			toast.success('Project updated successfully');
		},
		onError: (error: Error) => {
			toast.error(`Error: ${error.message}`);
		},
	});
}

export function useUpdateProjectStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, status }: { id: string; status: ProjectStatus }) =>
			projectsApi.updateStatus(id, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			toast.success('Project status updated');
		},
		onError: (error: Error) => {
			toast.error(`Error: ${error.message}`);
		},
	});
}

export function useDeleteProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => projectsApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
			toast.success('Project deleted');
		},
		onError: (error: Error) => {
			toast.error(`Error: ${error.message}`);
		},
	});
}
