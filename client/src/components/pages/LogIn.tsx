import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router';

import Logo from '../ui/molecules/Logo';
import Control from '../ui/atoms/Control';

const LogIn = () => {
	return (
		<Form
			className='col-lg-5 col-sm-8 col-md-7 container'>
			<Logo type={'text-secondary text-decoration-none fw-bold display-6 mb-4'} />
			<h1 className='h3 mb-3 fw-normal'>Log in to eCourse Learn</h1>
			<Control
				id={'email'}
				label={'Email address*'}
				type='email'
				placeholder={'Email address*'}
			/>
			<Control
				id={'password'}
				label={'Password'}
				type='password'
				placeholder={'Password'}
			/>
			<Button
				size='lg'
				className='mb-3 mx-auto d-block'
				variant='warning'
				type='submit'>
				Continue with Email
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
