import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as dataServices from '@/services/data';
import { RootState } from '../store';
import { Category } from '@/types/category';
import { setAuth } from './auth';
import { assignProductsToCart } from './cart';
import { assignProductsToWishlist } from './wishlist';
import { assignPromotions } from './promotions';
import { Customer } from '@/types/customer';

const initialState: { categories: Category[] } = {
  categories: [],
};

export const fetchCommonData = createAsyncThunk<any>('data/fetchCommonData', async (_, { dispatch }) => {
  const response = await dataServices.getCommonData();
  const customer: Customer = response.customer;

  if (customer) {
    dispatch(setAuth({ user: customer }));
    dispatch(assignProductsToCart({ cart: customer.cart }));
    dispatch(assignProductsToWishlist({ products: customer.wishlist }));
    dispatch(assignPromotions({ promotions: customer.promotions }));
  } else {
    const sessionID = localStorage.getItem('sessionID');
    const existingCart = JSON.parse(localStorage.getItem(`cart-${localStorage.getItem('sessionID')}`) || '{}');
    dispatch(
      assignProductsToCart({
        cart: sessionID === null ? [] : existingCart,
      }),
    );
  }
  return response;
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommonData.fulfilled, (state, { payload }) => {
      const { categories } = payload;
      state.categories = categories;
    });
  },
});

export const selectCategories = (state: RootState) => state.data?.categories || [];

export default dataSlice.reducer;
