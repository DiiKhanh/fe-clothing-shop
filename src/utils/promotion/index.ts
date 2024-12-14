import { Promotion } from '@/types/promotion';

export function isValidPromotion(totalProductsPrice: number, promotion: Promotion) {
  const isValid =
    totalProductsPrice >= promotion.minPrice &&
    promotion.amount > 0 &&
    new Date().getTime() <= new Date(promotion.endDate).getTime();
  return isValid;
}

export function getPromotionsByPercentage(promotions: Promotion[], percentage: number, greaterThan = false) {
  let filteredPromotions = [];
  if (greaterThan) {
    filteredPromotions = promotions.filter((promotion) => promotion.percentage > percentage);
  } else {
    filteredPromotions = promotions.filter((promotion) => promotion.percentage <= percentage);
  }

  return filteredPromotions;
}
