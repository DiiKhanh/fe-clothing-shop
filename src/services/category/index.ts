import { sendGetRequest } from '../request';

export const getCategories = async () => {
  const { categories } = await sendGetRequest('/categories');
  return categories;
};
