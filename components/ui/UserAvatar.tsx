import type { User } from '@/types';
import { memo } from 'react';
import { Avatar, AvatarFallback } from './Avatar';

interface UserAvatarProps {
	user: User;
}

/**
 * Avatar utente con colori dinamici in base al ruolo
 * Usa Avatar di shadcn/ui con Radix
 */
export const UserAvatar = memo<UserAvatarProps>(function UserAvatar({ user }) {
	const getAvatarColors = () => {
		if (user.role === 'MANAGER') {
			return {
				gradient: 'from-primary to-purple-700',
				ring: 'ring-primary/30',
			};
		}
		return {
			gradient: 'from-cyan-500 to-cyan-700',
			ring: 'ring-cyan-500/30',
		};
	};

	const avatarColors = getAvatarColors();

	return (
		<div className="flex items-center gap-3 text-sm">
			<div className="text-right">
				<p className="font-semibold text-foreground">{user.name}</p>
				<p className="text-xs text-muted-foreground capitalize">{user.role}</p>
			</div>
			<Avatar
				className={`h-10 w-10 shadow-lg ring-2 ${avatarColors.ring} cursor-default transition-all duration-200 hover:scale-105`}
			>
				<AvatarFallback
					className={`bg-gradient-to-br ${avatarColors.gradient} text-white font-bold`}
				>
					{user.name.charAt(0)}
				</AvatarFallback>
			</Avatar>
		</div>
	);
});
