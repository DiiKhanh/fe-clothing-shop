import { sendGetRequest } from '../request';

export const getAllProducts = async () => {
  const { products } = await sendGetRequest('/products');
  return products;
};

export const getProductsByCategory = async (categoryId: string) => {
  return await sendGetRequest(`/categories/${categoryId}/products`);
};

export const getProductById = async (productId: string) => {
  const { product } = await sendGetRequest(`/products/${productId}`);
  return product;
};

export const getHotProducts = async () => {
  const { products } = await sendGetRequest('/products/hot-products');
  return products;
};

export const getDiscountProducts = async () => {
  const { products } = await sendGetRequest('/products/discount-products');
  return products;
};

export const getProductsByType = async (type: string) => {
  const { products } = await sendGetRequest(`/products/type/${type}`);
  return products;
};

export const getProductsByKeyword = async (keyword: string, page?: number) => {
  return await sendGetRequest(`/products/search/${keyword}?page=${page}`);
};

export const getProductsByFilters = async (
  categoryId: string,
  types?: string | null,
  priceFrom?: number | null,
  priceTo?: number | null,
  materials?: string | null,
  textures?: string | null,
) => {
  return await sendGetRequest(
    // eslint-disable-next-line max-len
    `/products/filters?categoryId=${categoryId}&types=${types}&priceFrom=${priceFrom}&priceTo=${priceTo}&materials=${materials}&textures=${textures}`,
  );
};
