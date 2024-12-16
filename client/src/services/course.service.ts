import { apiClient } from './apis';
import { endpoints } from './endpoints';
import { Course, ListCourse } from '@/types/course.types';

export const fetchCourses = async (
	keyword: string | any,
	category: string | number | any,
): Promise<ListCourse> => {
	const response = await apiClient.get(endpoints['courses'](keyword, category));
	return response.data;
};

export const fetchCourse = async (id: string | undefined): Promise<Course> => {
	const response = await apiClient.get(endpoints['course'](id));
	return response.data;
};
