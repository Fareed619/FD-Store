import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/userAuthSlice";
import favoriteReducer from "./features/favoriteSlice";
import cartReducer from "./features/cartSlice";
import shopReducer from "./features/shopSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import apiSlice from "./api/apiSlice";
import { getFavoritesFromLocalStorage } from "../../utils/localStorage";

const initalFavorites = getFavoritesFromLocalStorage() || [];
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoriteReducer,
    cart: cartReducer,
    shop: shopReducer,
  },
  preloadedState: {
    favorites: initalFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
export default store;
