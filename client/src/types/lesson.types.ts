import { Resource } from './resource.types';

export type Lesson = {
	id: number | string;
	title: string;
	content: string;
	resources: Resource[];
};

export type ListLesson = {
	results: Pick<Lesson, 'id' | 'title' | 'content' | 'resources'>[];
};
