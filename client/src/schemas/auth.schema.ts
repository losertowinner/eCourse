import * as yup from 'yup';

export const loginSchema = yup.object({
	email: yup.string().required('Email is required').email('Email must be a valid email'),
	password: yup
		.string()
		.required('Password is required')
		.min(1, 'Password must be at least 6 characters'),
});
