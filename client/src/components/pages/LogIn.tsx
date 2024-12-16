import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router';

import { loginSchema } from '@/schemas/auth.schema';
import { Login } from '@/types/auth.types';
import { useLogin } from '@/hooks/useLogin';
import Logo from '../ui/molecules/Logo';

const LogIn = () => {
	const { login, isPending, error } = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
	} = useForm<Login>({
		resolver: yupResolver(loginSchema),
		mode: 'onChange',
	});

	const onSubmit = (data: Login) => {
		if (isValid) {
			login(data);
		}
	};

	return (
		<Form
			className='col-lg-5 col-sm-8 col-md-7 container'
			onSubmit={handleSubmit(onSubmit)}>
			<Logo type={'text-secondary text-decoration-none fw-bold display-6 mb-4'} />
			<h1 className='h3 mb-3 fw-normal'>Log in to eCourse Learn</h1>

			{error && (
				<Alert variant='danger' className='mb-3'>
					{error}
				</Alert>
			)}

			<Form.Group className='mb-3'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type='email'
					placeholder='Enter email'
					isInvalid={!!errors.email}
					{...register('email')}
				/>
				<Form.Control.Feedback type='invalid'>
					{errors.email?.message}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					placeholder='Password'
					isInvalid={!!errors.password}
					{...register('password')}
				/>
				<Form.Control.Feedback type='invalid'>
					{errors.password?.message}
				</Form.Control.Feedback>
			</Form.Group>

			<Button
				size='lg'
				className='mb-3 mx-auto d-block w-100'
				variant='warning'
				type='submit'
				disabled={isPending || !isDirty || !isValid}>
				{isPending ? (
					<>
						<Spinner
							as='span'
							animation='border'
							size='sm'
							role='status'
							aria-hidden='true'
							className='me-2'
						/>
						Loading...
					</>
				) : (
					'Continue with Email'
				)}
			</Button>

			<p className='text-center'>
				Don't have an account yet?{' '}
				<Link
					to={'/register'}
					className='text-body-secondary'>
					Register
				</Link>
			</p>
		</Form>
	);
};

export default LogIn;
