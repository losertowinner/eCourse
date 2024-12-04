import { FloatingLabel, Form } from "react-bootstrap";

type ControlProps = { id: string; label: string; type: string; placeholder: string };

const Control = (props: ControlProps) => {
	return (
		<Form.Group className='mb-3'>
			<FloatingLabel
				controlId={props.id}
				label={props.label}>
				<Form.Control
					type={props.type}
					placeholder={props.placeholder}
				/>
			</FloatingLabel>
		</Form.Group>
	);
};

export default Control;
