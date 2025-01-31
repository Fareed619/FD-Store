import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    setFavorite: (state, action) => {
      const productInfo = action.payload;
      const isFavoriteExists = state.some((p) => p._id === productInfo._id);
      if (!isFavoriteExists) {
        state.push(productInfo);
      }
    },
    removeFavorite: (state, action) => {
      const productInfo = action.payload;
      return state.filter((p) => p._id !== productInfo._id);
    },
    setFavoriteFromLocal: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFavorite, removeFavorite, setFavoriteFromLocal } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
