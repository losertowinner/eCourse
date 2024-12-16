import { NavLink } from 'react-router';

type LogoProps = {
	type?: string;
};

const Logo = (props: LogoProps) => {
	return (
		<NavLink
			to={'/'}
			className={props.type}>
			eCourse 🎓
		</NavLink>
	);
};

export default Logo;
