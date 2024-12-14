import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import {
  addToCart,
  assignProductsToCart,
  addToCartThunk,
  removeItemFromCartThunk,
  removeItemsFromCartThunk,
  updateQuantityThunk,
  removeFromCart,
  updateAmountOfProduct,
} from '@/redux/slices/cart';
import { useAppDispatch } from './useAppDispatch';
import useAuth from './useAuth';
import { Product } from '@/types/product';
import { CartItem } from '@/types/customer';
import { AutocompleteQuerySuggestionsHit } from '@algolia/autocomplete-plugin-query-suggestions/dist/esm/types';

export default function useCart() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAuth();
  const handleAddToCart = (product: Product | AutocompleteQuerySuggestionsHit, size: string, quantity: number) => {
    if (!isAuthenticated) {
      dispatch(addToCart({ productId: product, size, quantity, _id: uuidv4() }));
      toast.success('Đã thêm vào giỏ hàng');
      return;
    }

    dispatch(addToCartThunk({ productId: product._id.toString(), size, quantity }));
  };

  const handleRemoveOneFromCart = async (productId: string, size: string, callback: () => void) => {
    if (!isAuthenticated) {
      dispatch(removeFromCart({ id: productId, size }));
      callback();
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
      return;
    }

    const { success } = await dispatch(removeItemFromCartThunk({ productId, size })).unwrap();
    if (success) {
      callback();
    }
  };

  const handleRemoveAllFromCart = async (
    restCartItems: CartItem[],
    selectedCartItems: CartItem[],
    callback: Function,
  ) => {
    if (!isAuthenticated) {
      dispatch(assignProductsToCart({ cart: restCartItems }));
      callback();
      toast.success('Đã xóa các sản phẩm khỏi giỏ hàng');
      return;
    }

    const removedItems = selectedCartItems.map((item) => ({
      productId: (item.productId as Product)._id,
      size: item.size,
    }));
    const { success } = await dispatch(removeItemsFromCartThunk({ items: removedItems })).unwrap();
    if (success) {
      callback();
    }
  };

  const handleUpdateQuantity = async (productId: string, size: string, quantity: number) => {
    if (!isAuthenticated) {
      dispatch(
        updateAmountOfProduct({
          id: productId,
          size,
          quantity,
        }),
      );
      return;
    }

    dispatch(updateQuantityThunk({ productId, size, quantity }));
  };

  return {
    handleAddToCart,
    handleRemoveOneFromCart,
    handleRemoveAllFromCart,
    handleUpdateQuantity,
  };
}
