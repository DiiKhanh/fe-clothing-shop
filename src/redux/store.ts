import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import cartReducer from './slices/cart';
import dataReducer from './slices/data';
import wishlistReducer from './slices/wishlist';
import promotionsReducer from './slices/promotions';
import themeReducer from './slices/theme';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    data: dataReducer,
    wishlist: wishlistReducer,
    promotions: promotionsReducer,
    theme: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
