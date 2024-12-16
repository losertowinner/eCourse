import { Cookies } from 'react-cookie';

import { apiClient } from './apis';
import { endpoints } from './endpoints';

const cookies = new Cookies();

export const login = async (email: string, password: string) => {
	const response = await apiClient.post(endpoints['token'], {
		email,
		password,
	});
	saveToken(response.data.access_token);

	const user = await apiClient.get(endpoints['current_user'], {
		headers: {
			Authorization: `Bearer ${response.data.access_token}`,
		},
	});

	console.log(user.data);

	return {
		token: response.data.access_token,
		user: user.data,
	};
};

export const saveToken = (token: string) => {
	localStorage.setItem('token', token);

	cookies.set('token', token, {
		path: '/',
		maxAge: 7 * 24 * 60 * 60,
		secure: true,
		sameSite: 'strict',
	});
};

export const removeToken = () => {
	localStorage.removeItem('token');
	cookies.remove('token', { path: '/', secure: true, sameSite: 'strict' });
};

export const getToken = () => {
	const localToken = localStorage.getItem('token');
	if (localToken) return localToken;

	return cookies.get('token');
};
