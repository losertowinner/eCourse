import { apiClient } from './apis';
import { endpoints } from './endpoints';
import { Category } from '@/types/category.types';

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get(endpoints['categories']);
  return response.data;
};
