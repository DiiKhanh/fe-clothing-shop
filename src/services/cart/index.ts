import { sendPutRequest } from '../request';
import { CartPayload, RemovedCartItemPayload } from '../types/cart';

export const addToCart = async (item: CartPayload) => {
  return await sendPutRequest('/cart/add-to-cart', item);
};

export const updateQuantity = async (item: CartPayload) => {
  return await sendPutRequest('/cart/update-quantity', item);
};

export const removeItemsFromCart = async (items: RemovedCartItemPayload) => {
  return await sendPutRequest('/cart/remove-items', items);
};

export const removeItemFromCart = async (item: CartPayload) => {
  return await sendPutRequest('/cart/remove-item', item);
};
