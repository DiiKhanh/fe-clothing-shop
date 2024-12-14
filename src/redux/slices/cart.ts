import { addToCart as addToCartApi, updateQuantity, removeItemsFromCart, removeItemFromCart } from '@/services/cart';
import { CartPayload, RemovedCartItemPayload } from '@/services/types/cart';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';
import { toast } from 'react-toastify';
import { assignProductsToCartInLocal } from '@/utils/cart';

const initialState: { products: (CartItem & { productId: Product })[] } = {
  products:
    typeof window !== 'undefined' && localStorage.getItem(`cart-${localStorage.getItem('sessionID')}`)
      ? JSON.parse(localStorage.getItem(`cart-${localStorage.getItem('sessionID')}`) || '{}')
      : [],
};

export const addToCartThunk = createAsyncThunk<any, CartPayload>('cart/fetchAddToCart', async (itemData) => {
  try {
    const response = await addToCartApi(itemData);
    return response;
  } catch (error) {
    toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
  }
});

export const updateQuantityThunk = createAsyncThunk<any, CartPayload>('cart/fetchUpdateQuantity', async (itemData) => {
  try {
    const response = await updateQuantity(itemData);
    return response;
  } catch (error) {
    toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
  }
});

export const removeItemsFromCartThunk = createAsyncThunk<any, RemovedCartItemPayload>(
  'cart/fetchRemoveItemsFromCart',
  async (itemsData) => {
    try {
      const response = await removeItemsFromCart(itemsData);
      return response;
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  },
);

export const removeItemFromCartThunk = createAsyncThunk<any, CartPayload>(
  'cart/fetchRemoveItemFromCart',
  async (itemData) => {
    try {
      const response = await removeItemFromCart(itemData);
      return response;
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, size, quantity } = action.payload;

      let sessionID = localStorage.getItem('sessionID');
      if (!sessionID) {
        sessionID = uuidv4();
        localStorage.setItem('sessionID', sessionID);
      }

      const itemIndex = state.products.findIndex((item) => item.productId._id === productId._id && item.size === size);

      if (itemIndex === -1) {
        const product = { ...action.payload };
        state.products.push(product);
      } else {
        state.products[itemIndex].quantity += quantity;
      }

      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    removeFromCart(state, action) {
      const { id, size } = action.payload;
      state.products = state.products.filter(
        (item) => (item.productId._id === id && item.size !== size) || item.productId._id !== id,
      );

      const sessionID = localStorage.getItem('sessionID');
      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    checkOut(state) {
      state.products = [];
      const sessionID = localStorage.getItem('sessionID');
      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    updateAmountOfProduct(state, action) {
      const { id, size, quantity } = action.payload;

      const itemIndex = state.products.findIndex((item) => item.productId._id === id && item.size === size);
      state.products[itemIndex].quantity = quantity;

      const sessionID = localStorage.getItem('sessionID');
      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    assignProductsToCart(state, action) {
      const { cart } = action.payload;
      state.products = cart;
      assignProductsToCartInLocal(cart);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCartThunk.fulfilled, (state, { payload }) => {
      const { success, cart } = payload;

      if (success) {
        state.products = cart;
        assignProductsToCartInLocal(cart);
        toast.success('Đã thêm vào giỏ hàng');
      }
    });
    builder.addCase(updateQuantityThunk.fulfilled, (state, { payload }) => {
      const { success, cart } = payload;

      if (success) {
        state.products = cart;
        assignProductsToCartInLocal(cart);
      }
    });
    builder.addCase(removeItemsFromCartThunk.fulfilled, (state, { payload }) => {
      const { success, cart } = payload;

      if (success) {
        state.products = cart;
        assignProductsToCartInLocal(cart);
        toast.success('Đã xóa các sản phẩm khỏi giỏ hàng');
      }
    });
    builder.addCase(removeItemFromCartThunk.fulfilled, (state, { payload }) => {
      const { success, cart, message } = payload;

      if (success) {
        state.products = cart;
        assignProductsToCartInLocal(cart);
        toast.success(message);
      }
    });
  },
});

export const { addToCart, removeFromCart, checkOut, updateAmountOfProduct, assignProductsToCart } = cartSlice.actions;

export const selectCartProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
