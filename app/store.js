import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import apiSlice from "@/features/api/apiSlice";
import cartSlice from "@/features/cart/cartSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  cart: cartSlice,
});

// Define the persist config for your store
const persistConfig = {
  key: "root",
  storage,
  whitelist: [apiSlice.reducerPath],
  blacklist: ["'persist/PERSIST'"], // ignore the register function
};

// Wrap the apiSlice reducer with the persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware(getDefaultMiddleWares) {
    return getDefaultMiddleWares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware);
  },
});

export default store;
