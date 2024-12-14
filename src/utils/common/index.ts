import createCache from '@emotion/cache';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';

export const calculateTotalCart = (cartProducts: CartItem[]) => {
  const totalCart = cartProducts.reduce((total, cartProduct) => {
    return total + (cartProduct.productId as Product).price * cartProduct.quantity;
  }, 0);
  return totalCart;
};

export const checkValidVietNamPhoneNumber = (phoneNumber: string | undefined) => {
  if (!phoneNumber) return false;
  const regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  return regex.test(phoneNumber);
};

export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

export function printNumberWithCommas(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const isNumber = (value: any) => {
  return !isNaN(value);
};
