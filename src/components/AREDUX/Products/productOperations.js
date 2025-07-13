import { createAsyncThunk } from '@reduxjs/toolkit';
import  api  from '../../API/api';
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/api/products');
      console.log("Fetched products:", response.data.data);
      return response.data.data;
      
    } catch (error) {
        console.error("Error fetching products:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
