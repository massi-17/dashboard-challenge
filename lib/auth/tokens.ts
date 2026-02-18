import type { User, UserRole } from '@/types';

export interface AccessTokenPayload {
	userId: string;
	email: string;
	role: UserRole;
	exp: number;
}

export interface RefreshTokenPayload {
	userId: string;
	tokenId: string;
	exp: number;
}

function generateTokenId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export function generateAccessToken(user: User): string {
	const payload: AccessTokenPayload = {
		userId: user.id,
		email: user.email,
		role: user.role,
		exp: Date.now() + 30 * 60 * 1000,
	};

	return btoa(JSON.stringify(payload));
}

export function generateRefreshToken(userId: string): string {
	const payload: RefreshTokenPayload = {
		userId,
		tokenId: generateTokenId(),
		exp: Date.now() + 3 * 24 * 60 * 60 * 1000,
	};

	return btoa(JSON.stringify(payload));
}

export function validateAccessToken(token: string): AccessTokenPayload | null {
	try {
		const payload = JSON.parse(atob(token)) as AccessTokenPayload;

		if (payload.exp < Date.now()) {
			return null;
		}

		return payload;
	} catch {
		return null;
	}
}

export function validateRefreshToken(
	token: string,
): RefreshTokenPayload | null {
	try {
		const payload = JSON.parse(atob(token)) as RefreshTokenPayload;

		if (payload.exp < Date.now()) {
			return null;
		}

		return payload;
	} catch {
		return null;
	}
}

export function shouldRefreshAccessToken(token: string): boolean {
	try {
		const payload = JSON.parse(atob(token)) as AccessTokenPayload;
		const fiveMinutes = 5 * 60 * 1000;

		return payload.exp - Date.now() < fiveMinutes;
	} catch {
		return true;
	}
}
