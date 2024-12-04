import { Outlet } from 'react-router';

import Header from '../ui/organisms/Header';
import Footer from '../ui/organisms/Footer';

export default function RootLayout() {
	return (
		<>
			<Header />
			<main className='container min-vh-100 py-4'>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
