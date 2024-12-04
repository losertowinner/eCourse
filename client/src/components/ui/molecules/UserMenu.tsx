import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router';

const UserMenu = () => {
	return (
		<Nav>
			<NavLink
				to={'/login'}
				className={'nav-link'}>
				Log In
			</NavLink>
			<Nav.Link
				eventKey={2}
				href='#memes'>
				Register
			</Nav.Link>
		</Nav>
	);
};

export default UserMenu;
