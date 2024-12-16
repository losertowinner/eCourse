import { Row } from 'react-bootstrap';

import Title from '../ui/atoms/Title';
import List from '../ui/organisms/List';

const Courses = () => {
	return (
		<>
			<div className='px-4 py-5 my-3 text-center bg-body-tertiary rounded'>
				<h1 className='display-5 fw-bold text-body-emphasis mb-5'>
					Welcome to eCourse.org 🎓
				</h1>

				<figure className='text-center mb-4'>
					<blockquote className='blockquote'>
						<p className='mb-0 fw-semibold fs-4'>
							&quot;Right or wrong, it's very pleasant to
							break something from time to time.&quot;
						</p>
					</blockquote>
					<figcaption className='blockquote-footer fs-6'>
						Fyodor Dostoevsky
					</figcaption>
				</figure>
			</div>

			<section className='py-5'>
				<Title
					title='Earn free verified certifications with eCourse core
					curriculum:'
				/>
				<Row className='g-4 pt-5 row-cols-1 row-cols-lg-3'>
					<List />
				</Row>
			</section>
		</>
	);
};

export default Courses;
