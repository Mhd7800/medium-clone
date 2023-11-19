import { createSlice } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const authSlice = createSlice({
  name: 'login',
  initialState: { 
    user: null, token: null}, 
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
      localStorage.removeItem("auth_Token");
    },

    
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
//export const selectUserId = (state) => state.auth.userId; // Add selector for userId
