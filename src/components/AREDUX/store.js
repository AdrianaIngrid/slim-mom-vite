import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { productsReducer } from "./Products/productSlice";
import { diaryReducer } from "./DiaryRedux/diarySlice";
const persistConfig = {
  key: "auth", 
  storage,     
  whitelist: ["user", "token", "isLoggedIn"], 
};
const persistedReducer = persistReducer(persistConfig, authReducer);

 const store = configureStore({
  reducer: {
    auth: persistedReducer,
    products : productsReducer, 
    diary : diaryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
const persistor = persistStore(store);

export { store, persistor };