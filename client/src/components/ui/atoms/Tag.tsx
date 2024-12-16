import { Badge } from 'react-bootstrap';

type TagProps = {
	label: string;
};

const Tag = ({ label }: TagProps) => {
	return (
		<Badge
			bg='secondary'
			pill>
			{label}
		</Badge>
	);
};

export default Tag;
