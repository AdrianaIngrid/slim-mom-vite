import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDayInfo,
  addConsumedProduct,
  deleteConsumedProduct,
} from './diaryOperations';

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    consumedProducts: [],
    summary: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Day Info
      .addCase(fetchDayInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDayInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.consumedProducts = action.payload.consumedProducts || [];
        state.summary = action.payload.summary;
      })
      .addCase(fetchDayInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Consumed Product
      .addCase(addConsumedProduct.pending, state => {
        state.loading = true;
       
      })
      .addCase(addConsumedProduct.fulfilled, (state, action) => {
        state.loading = false;
     
        const { productId, title, date, quantity, calories } = action.payload;

        // Adaugă produsul consumat în lista
        state.consumedProducts.push({
          productId,
          title: title || "Unknown Product", // Titlu trimis de acțiune
          date,
          quantity,
          calories,
        });
  })
      .addCase(addConsumedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add consumed product.";
      })
      // Delete Consumed Product
      .addCase(deleteConsumedProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConsumedProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { productId } = action.payload;
      
      
        state.consumedProducts = state.consumedProducts.filter(
            (product) => product.productId !== productId
          );
      })
      .addCase(deleteConsumedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const diaryReducer = diarySlice.reducer;
