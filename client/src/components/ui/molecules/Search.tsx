import { FormEvent } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Search = () => {
	const navigate = useNavigate();

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const keyword = formData.get('keyword') as string;

		const params = new URLSearchParams({ keyword });
		navigate(`/courses?${params.toString()}`);
	};

	return (
		<Form
			method='get'
			className='d-lg-none d-block'
			action='/courses'
			onSubmit={handleSearch}>
			<Form.Control
				type='search'
				name='keyword'
				placeholder='Search...'
			/>
		</Form>
	);
};

export default Search;
