import { Promotion } from './../../types/promotion';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as promotionServices from '@/services/promotion';
import { SavePromotionPayload } from '@/services/types/promotion';
import { RootState } from '../store';

const initialState: { promotions: Promotion[]; loading: boolean } = {
  promotions: [],
  loading: false,
};

export const fetchSavePromotion = createAsyncThunk<any, SavePromotionPayload>(
  'promotions/fetchSavePromotion',
  async (data: SavePromotionPayload) => {
    const response = await promotionServices.savePromotion(data);
    return response;
  },
);

export const fetchRemovePromotion = createAsyncThunk<any, string>(
  'promotions/fetchRemovePromotion',
  async (promotionId: string) => {
    const response = await promotionServices.removePromotion(promotionId);
    return response;
  },
);

export const fetchUpdatePromotionQuantity = createAsyncThunk<any, string>(
  'promotions/fetchUpdatePromotionQuantity',
  async (promotionId: string) => {
    const response = await promotionServices.updatePromotionQuantity(promotionId);
    return response;
  },
);

const promotionSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    addPromotion: (state, action) => {
      const promotion = action.payload.promotion;
      state.promotions.push(promotion);
    },
    removePromotion: (state, action) => {
      const promotionId = action.payload.promotionId;
      const updatedPromotions = state.promotions.filter((promotion) => promotion._id.toString() !== promotionId);
      state.promotions = updatedPromotions;
    },
    assignPromotions: (state, action) => {
      const promotions = action.payload.promotions;
      state.promotions = [...promotions];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchSavePromotion.fulfilled, (state, { payload }) => {
      const { promotion, success } = payload;

      if (success) {
        state.promotions.push(promotion);
      }
    });

    builders.addCase(fetchRemovePromotion.fulfilled, (state, { payload }) => {
      const { updatedPromotions, success } = payload;

      if (success) {
        state.promotions = updatedPromotions;
      }
    });

    builders.addCase(fetchUpdatePromotionQuantity.fulfilled, (state, { payload }) => {
      const { updatedPromotion, success } = payload;

      if (success) {
        const existingPromotionIndex = state.promotions.findIndex(
          (promotion) => promotion._id.toString() === updatedPromotion._id.toString(),
        );
        state.promotions[existingPromotionIndex] = updatedPromotion;
      }
    });
  },
});

export const { addPromotion, removePromotion, assignPromotions } = promotionSlice.actions;

export const selectPromotions = (state: RootState) => state.promotions.promotions;
export const selectPromotionLoading = (state: RootState) => state.promotions.loading;

export default promotionSlice.reducer;
