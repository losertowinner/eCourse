type QuestionProps = {
	title: string;
	description: string;
};

const Question = (props: QuestionProps) => {
	return (
		<div>
			<h3 className='fw-bold mb-3'>{props.title}</h3>
			<p>{props.description}</p>
		</div>
	);
};

export default Question;
