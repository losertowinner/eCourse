import { Col } from 'react-bootstrap';

type FeatureProps = {
	icon: any;
	title: string;
	description: string;
};

const Feature = (props: FeatureProps) => {
	return (
		<Col>
			<div className='d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3'>
				{props.icon}
			</div>
			<h3 className='fs-2 fw-semibold text-body-emphasis'>{props.title}</h3>
			<p>{props.description}</p>
		</Col>
	);
};

export default Feature;
