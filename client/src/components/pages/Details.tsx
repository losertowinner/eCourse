import { ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import Resources from '../ui/organisms/Resources';
import { fetchCourse } from '@/services/course.service';
import { fetchLessons } from '@/services/lesson.service';
import Tag from '../ui/atoms/Tag';

const Details = () => {
	const params = useParams();

	const { data, isError } = useQuery({
			queryKey: ['course', params.id],
			queryFn: () => fetchCourse(params.id),
		});

	const { data: lessons } = useQuery({
			queryKey: ['lessons', params.id],
			queryFn: () => fetchLessons(params.id),
		});

	return (
		<section className='py-3'>
			{isError ? (
				<div className='text-center'>
					<h1 className='fs-1 fw-bold'>Oops!</h1>
					<p className='text-body-secondary'>
						Sorry, an unexpected error has occurred.
					</p>
				</div>
			) : (
				<>
					<h2 className='fw-bold fs-1 mb-3 text-center'>
						{data?.title}
					</h2>
					<p className='my-3 text-center'>{data?.description}</p>

					<ListGroup variant='flush'>
						{lessons?.results.map((lesson, idx) => (
							<ListGroup.Item
								className='px-3 py-4'
								key={idx}>
								<h3 className='fw-bold'>
									Lesson {idx + 1}:{' '}
									{lesson.title}
								</h3>
								<p>{lesson.content}</p>
								{lesson.tags?.map((tag, idx) => (
									<Tag
										label={tag}
										key={idx}
									/>
								))}
								{lesson.resources.map(
									(resource, idx) => (
										<Resources
											key={idx}
											{...resource}
										/>
									),
								)}
							</ListGroup.Item>
						))}
					</ListGroup>
				</>
			)}
		</section>
	);
};

export default Details;
