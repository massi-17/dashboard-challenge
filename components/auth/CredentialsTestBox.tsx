'use client';

import { Card } from '@/components/ui/Card';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface Credential {
	role: string;
	email: string;
	password: string;
}

const credentials: Credential[] = [
	{ role: 'Manager', email: 'manager@example.com', password: 'Password#123' },
	{ role: 'Viewer', email: 'viewer@example.com', password: 'Password#123' },
];

function CredentialItem({ credential }: { credential: Credential }) {
	const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(
		null,
	);

	const handleCopy = async (text: string, field: 'email' | 'password') => {
		await navigator.clipboard.writeText(text);
		setCopiedField(field);
		setTimeout(() => setCopiedField(null), 1800);
	};

	return (
		<div className="flex flex-col gap-1">
			<span className="text-xs font-semibold text-primary mb-1 tracking-wide uppercase">
				{credential.role}
			</span>
			<div className="flex flex-col sm:flex-row gap-2">
				<div
					onClick={() => handleCopy(credential.email, 'email')}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							handleCopy(credential.email, 'email');
						}
					}}
					role="button"
					tabIndex={0}
					aria-label={`Copy email: ${credential.email}`}
					className="group flex-1 flex items-center bg-card/80 border border-border rounded-lg px-3 py-1.5 cursor-pointer transition-all hover:border-primary hover:bg-card"
				>
					<span className="text-xs font-mono truncate text-muted-foreground">
						{credential.email}
					</span>
					<span className="ml-auto">
						{copiedField === 'email' ? (
							<Check className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
						) : (
							<Copy
								className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors"
								aria-hidden="true"
							/>
						)}
					</span>
				</div>
				<div
					onClick={() => handleCopy(credential.password, 'password')}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							handleCopy(credential.password, 'password');
						}
					}}
					role="button"
					tabIndex={0}
					aria-label={`Copy password for ${credential.role}`}
					className="group flex-1 flex items-center bg-card/80 border border-border rounded-lg px-3 py-1.5 cursor-pointer transition-all hover:border-primary hover:bg-card"
				>
					<span className="text-xs font-mono text-muted-foreground">
						{credential.password}
					</span>
					<span className="ml-auto">
						{copiedField === 'password' ? (
							<Check className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
						) : (
							<Copy
								className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors"
								aria-hidden="true"
							/>
						)}
					</span>
				</div>
			</div>
		</div>
	);
}

export function CredentialsTestBox() {
	return (
		<div className="flex justify-center w-full">
			<Card className="mt-4 sm:mt-6 w-full min-w-0 max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-lg py-6 px-4 sm:px-8 md:px-6 flex flex-col items-center">
				<header className="mb-3 flex items-center gap-2">
					<span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-1" />
					<span className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wide uppercase">
						Test Credentials
					</span>
				</header>
				<div className="space-y-4 w-full">
					{credentials.map((credential) => (
						<CredentialItem key={credential.role} credential={credential} />
					))}
				</div>
			</Card>
		</div>
	);
}
