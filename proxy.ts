import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const refreshToken = request.cookies.get('refresh-token');

	// Redirect homepage based on authentication
	if (pathname === '/') {
		const destination = refreshToken ? '/dashboard' : '/login';
		return NextResponse.redirect(new URL(destination, request.url));
	}

	// Redirect to login if not authenticated
	if (pathname !== '/login' && !refreshToken) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// Redirect to dashboard if already authenticated
	if (pathname === '/login' && refreshToken) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/dashboard/:path*', '/projects/:path*', '/login'],
};
