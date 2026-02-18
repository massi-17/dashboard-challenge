import { CredentialsTestBox } from '@/components/auth/CredentialsTestBox';
import { LoginForm } from '@/components/auth/LoginForm';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/Card';
import Image from 'next/image';

export default function LoginPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-card px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
			<Card className="w-full max-w-md shadow-xl border-0 bg-background/80 backdrop-blur-xl">
				<CardHeader className="flex flex-col items-center gap-3 pb-2">
					<Image
						src="/globe.svg"
						alt="Logo"
						width={40}
						height={40}
						className="mb-1"
					/>
					<CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-400 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_2px_16px_hsl(var(--primary)/0.8)]">
						Sign in to Dashboard
					</CardTitle>
					<CardDescription className="text-base text-muted-foreground font-medium text-center">
						Enter your credentials to access your projects
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-0 pb-2">
					<LoginForm />
				</CardContent>
				<CardFooter className="flex flex-col items-center gap-2 pt-0">
					<CredentialsTestBox />
				</CardFooter>
			</Card>
		</div>
	);
}
