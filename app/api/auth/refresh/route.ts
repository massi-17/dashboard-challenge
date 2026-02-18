import { MOCK_USERS_BY_ID } from '@/lib/api/mockUsersData';
import { generateAccessToken, validateRefreshToken } from '@/lib/auth/tokens';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
	try {
		const cookieStore = await cookies();
		const refreshToken = cookieStore.get('refresh-token')?.value;

		if (!refreshToken) {
			return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
		}

		const payload = validateRefreshToken(refreshToken);

		if (!payload) {
			return NextResponse.json(
				{ error: 'Invalid or expired refresh token' },
				{ status: 401 },
			);
		}

		const user = MOCK_USERS_BY_ID[payload.userId];

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 401 });
		}

		const accessToken = generateAccessToken(user);

		return NextResponse.json({
			accessToken,
			user,
		});
	} catch (error) {
		console.error('Refresh token error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
