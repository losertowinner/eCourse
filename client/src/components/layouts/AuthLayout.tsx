import { Outlet } from 'react-router';

import Header from '../ui/organisms/Header';

const AuthLayout = () => {
	return (
		<>
			<Header />
			<main className='row px-5 m-lg-5 my-5'>
				<Outlet />
			</main>
		</>
	);
};

export default AuthLayout;
