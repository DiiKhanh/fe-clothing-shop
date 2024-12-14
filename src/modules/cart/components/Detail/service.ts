import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';

export const getTotalPrice = (products: CartItem[]) => {
  return products.reduce((acc, item) => {
    const product = item.productId as Product;
    return acc + product.price * item.quantity;
  }, 0);
};
