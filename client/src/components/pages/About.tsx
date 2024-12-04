import Question from '../ui/molecules/Question';

const About = () => {
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
			title: 'Can I redistribute the content?',
			description:
				'No, the license of the content on this website does not allow you to redistribute any of the content on this website anywhere. You can use it for personal use or share the link to the content if you have to but redistribution is not allowed.',
		},
		{
			title: 'What is the best way to contact you?',
			description:
				"Tweet or send me a message @kamrify or email me at kamranahmed.se@gmail.com. I get lots of messages so apologies in advance if you don't hear back from me soon but I do reply to everyone.",
		},
	];

	return (
		<section className='py-3'>
			{questions.map((question, idx) => (
				<Question
					key={idx}
					{...question}
				/>
			))}
		</section>
	);
};

export default About;
