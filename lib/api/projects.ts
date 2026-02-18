import type {
	PaginatedResponse,
	PaginationParams,
	Project,
	ProjectStatus,
} from '@/types';
import { defaultMockProjects } from './mockProjectsData';

const STORAGE_KEY = 'dashboard-projects';
const loadProjects = (): Project[] => {
	if (typeof window === 'undefined') return [...defaultMockProjects];

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored) as Project[];
		}
	} catch (error) {
		console.error('Failed to load projects from localStorage:', error);
	}

	saveProjects(defaultMockProjects);
	return [...defaultMockProjects];
};

const saveProjects = (projects: Project[]): void => {
	if (typeof window === 'undefined') return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
	} catch (error) {
		console.error('Failed to save projects to localStorage:', error);
	}
};

export const resetProjectsToDefaults = (): void => {
	if (typeof window === 'undefined') return;

	try {
		localStorage.removeItem(STORAGE_KEY);
		mockProjects = [...defaultMockProjects];
		saveProjects(mockProjects);
	} catch (error) {
		console.error('Failed to reset projects:', error);
	}
};

let mockProjects: Project[] = loadProjects();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const projectsApi = {
	async getProjects(
		params: PaginationParams,
	): Promise<PaginatedResponse<Project>> {
		await delay(500);

		let filtered = [...mockProjects];
		if (params.search && params.search.trim() !== '') {
			const searchLower = params.search.toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(searchLower) ||
					p.description?.toLowerCase().includes(searchLower),
			);
		}

		if (params.status && params.status !== 'all') {
			filtered = filtered.filter((p) => p.status === params.status);
		}

		const total = filtered.length;
		const totalPages = Math.ceil(total / params.pageSize);

		const start = (params.page - 1) * params.pageSize;
		const end = start + params.pageSize;
		const items = filtered.slice(start, end);

		return {
			items,
			total,
			page: params.page,
			pageSize: params.pageSize,
			totalPages,
		};
	},

	async getAll(): Promise<Project[]> {
		await delay(500);
		return [...mockProjects];
	},

	async getById(id: string): Promise<Project | null> {
		await delay(2000);
		const project = mockProjects.find((p) => p.id === id);
		return project || null;
	},

	async create(data: Omit<Project, 'id'>): Promise<Project> {
		await delay(500);
		const newProject: Project = {
			...data,
			id: Date.now().toString(),
		};
		mockProjects.push(newProject);
		saveProjects(mockProjects);
		return newProject;
	},

	async update(
		id: string,
		data: Partial<Omit<Project, 'id' | 'createdAt'>>,
	): Promise<Project | null> {
		await delay(500);
		const index = mockProjects.findIndex((p) => p.id === id);
		if (index === -1) {
			return null;
		}
		mockProjects[index] = {
			...mockProjects[index],
			...data,
		};
		saveProjects(mockProjects);
		return mockProjects[index];
	},

	async updateStatus(id: string, status: ProjectStatus): Promise<Project> {
		await delay(800);
		const updated = await this.update(id, { status });
		if (!updated) {
			throw new Error(`Project with id ${id} not found`);
		}
		return updated;
	},

	async delete(id: string): Promise<void> {
		await delay(300);
		mockProjects = mockProjects.filter((p) => p.id !== id);
		saveProjects(mockProjects);
	},
};
