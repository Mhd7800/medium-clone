import { createSlice } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const authSlice = createSlice({
  name: 'login',
  initialState: { 
    user: null, token: null, userId: null }, 
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      localStorage.setItem("auth_Token", accessToken);
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.userId = null; // Clear userId when logging out
      localStorage.removeItem("auth_Token");
    },

    setUserId: (state, action) => {
      state.userId = action.payload; 
    },
  },
});

export const { setCredentials, logOut, setUserId } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
//export const selectUserId = (state) => state.auth.userId; // Add selector for userId
