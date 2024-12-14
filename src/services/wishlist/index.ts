import { sendPostRequest } from '../request';
import { WishlistPayload } from '../types/wishlist';

export const addProductToWishlist = async (data: WishlistPayload) => {
  return await sendPostRequest('/wishlist/add', data);
};

export const removeProductFromWishlist = async (data: WishlistPayload) => {
  return await sendPostRequest('/wishlist/remove', data);
};
