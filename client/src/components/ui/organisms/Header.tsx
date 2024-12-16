import { useQuery } from '@tanstack/react-query';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router';
import { CiDark } from 'react-icons/ci';

import Logo from '../molecules/Logo';
import UserMenu from '../molecules/UserMenu';
import Search from '../molecules/Search';
import { fetchCategories } from '@/services/category.service';
import { Category } from '@/types/category.types';

const Header = () => {
	const { data } = useQuery<Category[]>({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	});

	return (
		<header className='sticky-top'>
			<Navbar
				collapseOnSelect
				expand='lg'
				className='bg-body-tertiary'>
				<Container>
					<Logo type={'navbar-brand fw-bold'} />
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto'>
							<NavDropdown
								title='Categories'
								id='collapsible-nav-dropdown'>
								{data?.map((category) => (
									<Link
										className='dropdown-item'
										key={category.id}
										to={`/courses?category=${category.id}`}>
										{category.title}
									</Link>
								))}
							</NavDropdown>
							<NavLink
								to={'/courses'}
								className={'nav-link'}>
								Courses
							</NavLink>
							<NavLink
								to={'/about'}
								className={'nav-link'}>
								About
							</NavLink>
						</Nav>
						<Nav className='mb-2 mb-lg-0'>
							<UserMenu />
							<NavLink
								to={'/register'}
								className={'nav-link'}>
								<CiDark className='size-6' />
							</NavLink>
						</Nav>
						<Search />
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
