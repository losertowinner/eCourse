import { apiClient } from './apis';
import { endpoints } from './endpoints';
import { ListLesson } from '@/types/lesson.types';

export const fetchLessons = async (id: string | undefined): Promise<ListLesson> => {
  const response = await apiClient.get(endpoints['lessons'](id));
  return response.data;
};
