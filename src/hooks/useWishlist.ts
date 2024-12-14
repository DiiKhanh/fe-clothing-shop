import { fetchAddToWishlist, fetchRemoveFromWishlist } from '@/redux/slices/wishlist';
import { useAppDispatch } from './useAppDispatch';

export function useWishlist() {
  const dispatch = useAppDispatch();

  const handleAddToWishlist = async (productId: string, onSuccess?: () => void) => {
    const { success } = await dispatch(fetchAddToWishlist({ productId })).unwrap();
    if (success && onSuccess) {
      onSuccess();
    }
  };

  const handleRemoveFromWishlist = async (productId: string, onSuccess?: () => void) => {
    const { success } = await dispatch(fetchRemoveFromWishlist({ productId })).unwrap();
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return {
    handleAddToWishlist,
    handleRemoveFromWishlist,
  };
}
