import { Link } from 'react-router';

import Logo from '../molecules/Logo';
import Scroll from '../atoms/Scroll';

const Footer = () => {
	return (
		<footer className='container py-3 mt-3 border-top'>
			<div className='d-flex justify-content-between align-items-center'>
				<div>
					<Logo
						type={
							'fw-bold me-2 text-body-secondary text-decoration-none lh-1'
						}
					/>
					<span className='text-body-secondary'>
						&copy; {new Date().getFullYear()}{' '}
						<Link
							className='text-decoration-none text-body-secondary fst-italic'
							to={'https://github.com/losertowinner'}>
							ZIN
						</Link>
						, Inc
					</span>
				</div>
				<div>
					<Scroll />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
