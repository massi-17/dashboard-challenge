import { ErrorBoundary } from '@/guards/ErrorBoundary';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
	title: 'SaaS Project Dashboard',
	description: 'Project management dashboard',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body className={spaceGrotesk.className}>
				<ErrorBoundary>
					<Providers>{children}</Providers>
				</ErrorBoundary>
			</body>
		</html>
	);
}
