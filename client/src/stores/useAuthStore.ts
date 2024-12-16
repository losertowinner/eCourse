import { create } from 'zustand';

import { removeToken } from '@/services/auth.service';
import { User } from '@/types/auth.types';

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	setUser: (user: User) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
	user: null,
	isAuthenticated: false,
	setUser: (user) => set({ user, isAuthenticated: true }),
	logout: () => {
		removeToken();
		set({ user: null, isAuthenticated: false });
	},
}));
