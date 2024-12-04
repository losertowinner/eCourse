import axios from 'axios';

import { endpoints } from './endpoints';
import { Category } from '@/types/category.types';
import { Course, ListCourse } from '@/types/course.types';
import { ListLesson } from '@/types/lesson.types';

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

export const fetchCategories = async (): Promise<Category[]> => {
	const response = await apiClient.get(endpoints['categories']);
	return response.data;
};

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

export const fetchLessons = async (id: string | undefined): Promise<ListLesson> => {
	const response = await apiClient.get(endpoints['lessons'](id));
	return response.data;
};
