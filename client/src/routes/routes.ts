import About from '@/components/pages/About';
import Courses from '@/components/pages/Courses';
import Details from '@/components/pages/Details';
import Home from '@/components/pages/Home';
import LogIn from '@/components/pages/LogIn';
import NotFound from '@/components/pages/NotFound';
import Register from '@/components/pages/Register';

import { RoutesTypes } from '@/types/routes.types';

const publicRoutes: RoutesTypes[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/courses',
		component: Courses,
	},
	{
		path: '/courses/:id',
		component: Details,
	},
	{
		path: '/about',
		component: About,
	},
	{
		path: '/*',
		component: NotFound,
	},
];

const authRoutes: RoutesTypes[] = [
	{
		path: '/login',
		component: LogIn,
	},
	{
		path: '/register',
		component: Register,
	},
];

export { publicRoutes, authRoutes };
