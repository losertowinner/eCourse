import { Base, Common } from './common.types';
import { Resource } from './resource.types';

export type Lesson = Common &
	Base & {
		content: string;
		resources: Resource[];
	};

export type ListLesson = {
	results: Pick<Lesson, 'id' | 'title' | 'content' | 'tags' | 'resources'>[];
};
