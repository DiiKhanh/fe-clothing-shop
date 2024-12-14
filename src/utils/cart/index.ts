import { v4 as uuidv4 } from 'uuid';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';

export function assignProductsToCartInLocal(products: (CartItem & { productId: Product })[]) {
  let sessionID = localStorage.getItem('sessionID');
  if (!sessionID) {
    sessionID = uuidv4();
    localStorage.setItem('sessionID', sessionID);
  }

  localStorage.setItem(`cart-${sessionID}`, JSON.stringify(products));
}

export const getTotalPrice = (cartProducts: CartItem[]) => {
  return cartProducts?.reduce((totalPrice, cartItem) => {
    return totalPrice + (cartItem.productId as Product).price * cartItem.quantity;
  }, 0);
};
