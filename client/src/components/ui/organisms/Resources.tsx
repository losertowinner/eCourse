import { Link } from 'react-router';

import { Resource } from '@/types/resource.types';

const Resources = (props: Resource) => {
	return (
		<ul className='list-group list-group-flush'>
			<li className='list-group-item'>
				<Link
					target='_blank'
					className='text-dark'
					to={`${props.url}`}>
					{props.title}
				</Link>
			</li>
		</ul>
	);
};

export default Resources;
