import { sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest } from '../request';
import { SavePromotionPayload } from '../types/promotion';

export const getPromotions = async () => {
  return await sendGetRequest('/promotions');
};

export const savePromotion = async (data: SavePromotionPayload) => {
  return await sendPostRequest('/promotions/save', data);
};

export const removePromotion = async (promotionId: string) => {
  return await sendDeleteRequest(`/promotions/customer/${promotionId}`);
};

export const updatePromotionQuantity = async (promotionId: string) => {
  return await sendPutRequest(`/promotions/${promotionId}/quantity`, {});
};
