export type Course = {
	id: number;
	title: string;
	description: string;
};

export type ListCourse = {
	results: Pick<Course, 'id' | 'title' | 'description'>[];
};
