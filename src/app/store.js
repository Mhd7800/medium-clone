import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import userReducer from "../features/userSlice"
import authReducer from "../features/authSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducer]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware=>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});
