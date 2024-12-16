import { Base, Common } from './common.types';

export type Course = Common &
	Base & {
		description: string;
	};

export type ListCourse = {
	results: Pick<Course, 'id' | 'title' | 'description' | 'tags'>[];
};
