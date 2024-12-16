import { useQuery } from '@tanstack/react-query';
import { Accordion } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router';

import Loading from '../atoms/Loading';
import { fetchCourses } from '@/services/course.service';
import Tag from '../atoms/Tag';

const List = () => {
	const [searchParams] = useSearchParams();
	const keyword = searchParams.get('keyword');
	const category = searchParams.get('category');

	const { data, isLoading } = useQuery({
		queryKey: ['courses', keyword, category],
		queryFn: () => fetchCourses(keyword, category),
	});

	if (isLoading) return <Loading />;

	console.log(data);

	return (
		<>
			{data?.results.map((course, idx) => (
				<Accordion key={idx}>
					<Accordion.Item eventKey={String(course.id)}>
						<Accordion.Header>
							<span className='fw-bold fs-5'>
								{course.title}
							</span>
						</Accordion.Header>
						<Link
							to={`/courses/${course.id}`}
							className='text-decoration-none'>
							<Accordion.Body className='text-body-secondary'>
								<p>{course.description}</p>
								{course.tags?.map((tag, idx) => (
									<Tag
										label={tag}
										key={idx}
									/>
								))}
							</Accordion.Body>
						</Link>
					</Accordion.Item>
				</Accordion>
			))}
		</>
	);
};

export default List;
