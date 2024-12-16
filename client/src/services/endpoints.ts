export const endpoints = {
	categories: import.meta.env.VITE_CATEGORIES_URL,
	courses: (keyword: string | any, category: string | number | any) => {
		let url = `${import.meta.env.VITE_COURSES_URL}?`;
		if (keyword) url += `keyword=${keyword}&`;
		if (category) url += `category=${category}`;
		return url.slice(-1) === '&' ? url.slice(0, -1) : url;
	},
	course: (id: string | undefined) => `${import.meta.env.VITE_COURSES_URL}/${id}/`,
	lessons: (id: string | undefined) => `${import.meta.env.VITE_COURSES_URL}/${id}/lessons/`,
	token: import.meta.env.VITE_TOKEN_URL,
	current_user: import.meta.env.VITE_CURRENT_USER_URL,
};
