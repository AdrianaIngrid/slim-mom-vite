import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../API/api';

export const fetchDayInfo = createAsyncThunk(
  'diary/fetchDayInfo',
  async (date, { rejectWithValue }) => {
    try {
      const formattedDate = new Date(date).toISOString().slice(0, 10); // Format YYYY-MM-DD
      const response = await api.get(`/api/products/day/${formattedDate}`);

      // Dacă nu există produse consumate, returnează valori implicite
      if (response.data.status === 'success' && !response.data.data.consumedProducts.length) {
        console.log("No consumed products found for date:", formattedDate);
        return {
          consumedProducts: [],
          summary: {
            left: 0,
            consumed: 0,
            dailyCalories: 0,
            percentageOfNormal: 0,
          },
          foodNotRecommended: [], // Adaugă lista implicită pentru alimente nerecomandate
        };
      }

      console.log("Răspuns Backend:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Eroare la fetchDayInfo:", error);

      // Returnează valori implicite și loghează eroarea
      return rejectWithValue({
        consumedProducts: [],
        summary: {
          left: 0,
          consumed: 0,
          dailyCalories: 0,
          percentageOfNormal: 0,
        },
        foodNotRecommended: [], // Valori implicite
        error: error.response?.data || error.message,
      });
    }
  }
);

  export const addConsumedProduct = createAsyncThunk(
    'diary/addConsumedProduct',
    async ({ productId, date, quantity }, { rejectWithValue }) => {
      try {
        const response = await api.post('/api/products/consumed', {
          productId,
          date,
          quantity,
        });
        console.log("Răspuns Backend:", response.data.data); // Verifică răspunsul
        return response.data.data; // Datele produsului adăugat
      } catch (error) {
        console.error("Eroare Backend:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  export const deleteConsumedProduct = createAsyncThunk(
    'diary/deleteConsumedProduct',
    async ({ productId, date }, { rejectWithValue }) => {
      try {
         await api.delete(`/api/products/consumed/${productId}`, {
          data: { date }, // Trimite data consumului
        });
        return { productId, date }; // Returnează datele șterse
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  export const fetchAvailableProducts = createAsyncThunk(
    "products/fetchAvailableProducts",
    async (searchQuery = "", { rejectWithValue }) => {
      try {
        const response = await api.get("/products", {
          params: { search: searchQuery }, // Trimite interogarea de căutare (dacă există)
        });
        return response.data.data; // Returnează produsele
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );