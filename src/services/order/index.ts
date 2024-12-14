import { sendPostRequest, sendPutRequest } from '../request';
import { CheckoutOrderPayload, CreateOrderPayload } from '../types/order';

export const createOrder = async (data: CreateOrderPayload) => {
  return await sendPostRequest('/orders/create-order', data);
};

export const checkOutOrder = async (data: CheckoutOrderPayload) => {
  return await sendPutRequest('/orders/check-out', data);
};
