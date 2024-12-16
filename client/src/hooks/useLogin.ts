import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

import { login } from '@/services/auth.service';
import { Login } from '@/types/auth.types';
import { useAuthStore } from '@/stores/useAuthStore';

export const useLogin = () => {
	const navigate = useNavigate();
	const setUser = useAuthStore((state) => state.setUser);

	const mutation = useMutation({
		mutationFn: ({ email, password }: Login) => login(email, password),
		onSuccess: (data) => {
			setUser(data.user);
			navigate('/');
		},
		onError: (error) => {
			console.error('Login error:', error);
		},
	});

	const error = mutation.error
		? (mutation.error as AxiosError<{ message: string }>)?.response?.data?.message ||
		  'Email or password is incorrect'
		: null;

	return {
		login: mutation.mutate,
		isPending: mutation.isPending,
		error,
	};
};
