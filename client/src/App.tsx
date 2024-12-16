import { FC } from 'react';
import { Route, Routes } from 'react-router';

import RootLayout from '@/components/layouts/RootLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import { authRoutes, publicRoutes } from '@/routes/routes';

const App: FC = () => {
	return (
		<Routes>
			<Route element={<RootLayout />}>
				{publicRoutes.map((route, index) => {
					const Page = route.component;
					return (
						<Route
							key={index}
							path={route.path}
							element={<Page />}
						/>
					);
				})}
			</Route>

			<Route element={<AuthLayout />}>
				{authRoutes.map((route, index) => {
					const Page = route.component;
					return (
						<Route
							key={index}
							path={route.path}
							element={<Page />}
						/>
					);
				})}
			</Route>
		</Routes>
	);
};

export default App;
