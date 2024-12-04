import { Row } from 'react-bootstrap';
import { MdGroups } from 'react-icons/md';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa6';
import { Link } from 'react-router';

import Hero from '../ui/organisms/Hero';
import Feature from '../ui/molecules/Feature';
import Question from '../ui/molecules/Question';
import Title from '../ui/atoms/Title';

const Home = () => {
	const fetures = [
		{
			title: 'Large Community',
			description:
				'Join our vibrant learning community of students, alumni, and educators.',
			icon: <MdGroups />,
		},
		{
			title: 'Free Education',
			description:
				'Learn from our charity and save money on your education. No paywalls. No hidden costs.',
			icon: <MdOutlineAttachMoney />,
		},
		{
			title: 'Extensive Certifications',
			description:
				'Earn industry-recognized, verifiable certifications in high-demand technologies.',
			icon: <FaGraduationCap />,
		},
	];

	const questions = [
		{
			title: 'What exactly is eCourse?',
			description:
				"eCourse is a community of people from all around the world who are learning to code together. We're a 501(c)(3) public charity.",
		},
		{
			title: 'How will eCourse help me learn to code?',
			description:
				'You will learn to code by building dozens of projects, step-by-step, right in your browser, code editor, or mobile app.',
		},
		{
			title: 'Is eCourse really free?',
			description:
				'Yes. Every aspect of eCourse is 100% free. The courses, the projects, and even the certifications.',
		},
		{
			title: 'Can eCourse help me get a job as a software developer?',
			description:
				'Yes. Every year, thousands of people who join the eCourse community get their first software developer job.',
		},
		{
			title: 'What skills will I learn?',
			description:
				"You will learn the skills most developers use on the job: HTML, CSS, JavaScript, Python, Linux, Git, and SQL, and more. You'll also learn how to use powerful libraries for web development, mobile app development, data science, and artificial intelligence.",
		},
		{
			title: 'How long does it take to learn all this?',
			description:
				"eCourse is self-paced. Realistically, it may take several years of practicing coding to learn these skills well enough to get a job as a software engineer. Don't quit school or your day job until you feel ready.",
		},
		{
			title: 'How do I get started?',
			description:
				"If you're a beginner, you should start at the beginning of the eCourse core curriculum. If you're more advanced, we still recommend starting at the beginning, but you can skip to whatever area you wish.",
		},
		{
			title: 'How do I earn the free verified certifications?',
			description:
				'For each certification, you need to build its 5 certification projects, and get all of the project tests to pass to be able to claim your certification.',
		},
		{
			title: "I don't see [name of tool] in the eCourse core curriculum.",
			description:
				'Aside from the eCourse core curriculum, We have thousands of free, full-length books, courses, and programming tutorials. We almost certainly teach whatever programming tools you want to learn. Just use the search bar.',
		},
	];

	return (
		<>
			<Hero />
			<section className='py-5'>
				<Title title='Why learn with eCourse:' />
				<Row className='g-4 py-5 row-cols-1 row-cols-lg-3'>
					{fetures.map((feture, idx) => (
						<Feature
							key={idx}
							{...feture}
						/>
					))}
				</Row>
				<p className='text-center'>
					<Link
						to={'/courses'}
						className='btn btn-warning btn-lg fs-3'>
						Start Learning Now (it's free)
					</Link>
				</p>
			</section>
			<section className='py-3'>
				<h2 className='fw-bold mb-4'>Frequently asked questions:</h2>
				{questions.map((question, idx) => (
					<Question
						key={idx}
						{...question}
					/>
				))}
				<p className='fw-bold fs-4'>Happy coding!</p>
				<p className='text-center'>
					<Link
						to={'/courses'}
						className='btn btn-warning btn-lg fs-3'>
						Get started (it's free)
					</Link>
				</p>
			</section>
		</>
	);
};

export default Home;
