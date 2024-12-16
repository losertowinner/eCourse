import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router';

import { useAuthStore } from '@/stores/useAuthStore';
import Avatar from './Avatar';

const UserMenu = () => {
	const { user, isAuthenticated, logout } = useAuthStore();

	return (
		<>
			{!isAuthenticated ? (
				<>
					<NavLink
						to={'/login'}
						className={'nav-link'}>
						Log In
					</NavLink>
					<NavLink
						to={'/register'}
						className={'nav-link'}>
						Register
					</NavLink>
				</>
			) : (
				<NavDropdown
					title={
						<Avatar
							user={user!}
							size={32}
						/>
					}
					id='user-nav-dropdown'>
					<NavDropdown.Item
						as={NavLink}
						to='/profile'>
						Profile
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
				</NavDropdown>
			)}
		</>
	);
};

export default UserMenu;
