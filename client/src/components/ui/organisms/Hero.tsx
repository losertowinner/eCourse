import { FC } from 'react';
import { Link } from 'react-router';

const Hero: FC = () => {
	return (
		<div className='px-4 py-5 my-3 text-center bg-body-tertiary rounded'>
			<h1 className='display-5 fw-bold text-body-emphasis'>
				Learn to code — for free.
				<br />
				Build projects.
				<br />
				Earn certifications 🎓.
			</h1>
			<p className='lead mb-4'>
				More than 100,000 eCourse.org graduates have gotten jobs at tech
				companies 🔖.
			</p>
			<p>
				<Link
					to={'/courses'}
					className='btn btn-warning btn-lg fs-3'>
					Get started (it's free)
				</Link>
			</p>
		</div>
	);
};

export default Hero;
