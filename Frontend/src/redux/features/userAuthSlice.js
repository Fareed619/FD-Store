import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

export const userAuthSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    // login
    setCredientials: (state, action) => {
      const userInfo = action.payload;
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },

    // Logout
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredientials, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
