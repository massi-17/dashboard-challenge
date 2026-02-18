'use client';

import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';
import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Error Boundary caught an error:', error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen flex items-center justify-center p-4">
					<div className="max-w-md w-full rounded-2xl border border-destructive/50 bg-destructive/10 p-8 text-center backdrop-blur-sm">
						<div className="flex justify-center mb-4">
							<AlertTriangle
								className="h-12 w-12 text-destructive"
								aria-hidden="true"
							/>
						</div>
						<h2 className="text-2xl font-bold text-foreground mb-2">
							Something went wrong
						</h2>
						<p className="text-muted-foreground mb-6">
							An unexpected error occurred. Please try again or contact support
							if the problem persists.
						</p>
						{this.state.error && (
							<details className="mb-6 text-left">
								<summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
									Technical Details
								</summary>
								<pre className="mt-2 text-xs bg-background/50 p-4 rounded-lg overflow-auto">
									{this.state.error.message}
								</pre>
							</details>
						)}
						<div className="flex gap-3 justify-center">
							<Button onClick={this.handleReset} variant="primary">
								Retry
							</Button>
							<Button onClick={() => window.history.back()} variant="secondary">
								Go back
							</Button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
