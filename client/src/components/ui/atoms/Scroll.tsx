import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { GoMoveToTop } from 'react-icons/go';

const Scroll = () => {
	const [, setVisible] = useState<boolean>(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true);
		} else if (scrolled <= 300) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	window.addEventListener('scroll', toggleVisible);

	return (
		<Button
			onClick={scrollToTop}
			variant='none'>
			<GoMoveToTop className='size-6' />
		</Button>
	);
};

export default Scroll;
