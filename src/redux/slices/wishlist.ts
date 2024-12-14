import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as wishlistServices from '@/services/wishlist';
import { RootState } from '../store';
import { WishlistPayload } from '@/services/types/wishlist';

const initialState = {
  products: [],
};

export const fetchAddToWishlist = createAsyncThunk<any, WishlistPayload>(
  'wishlist/fetchAddToWishlist',
  async (product) => {
    try {
      const response = await wishlistServices.addProductToWishlist(product);
      return response;
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  },
);

export const fetchRemoveFromWishlist = createAsyncThunk<any, WishlistPayload>(
  'wishlist/fetchRemoveFromWishlist',
  async (productId) => {
    try {
      const response = await wishlistServices.removeProductFromWishlist(productId);
      return response;
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  },
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    assignProductsToWishlist(state, action) {
      const updatedProducts = action.payload.products;
      state.products = updatedProducts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddToWishlist.fulfilled, (state, { payload }) => {
      const { wishlist, success, message } = payload;

      if (success) {
        state.products = wishlist;
        toast.success(message);
      } else {
        toast.warn(message);
      }
    });

    builder.addCase(fetchRemoveFromWishlist.fulfilled, (state, { payload }) => {
      const { wishlist, success, message } = payload;

      if (success) {
        state.products = wishlist;
        toast.success(message);
      }
    });
  },
});

export const selectWishlistProducts = (state: RootState) => state.wishlist.products;

export const { assignProductsToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
