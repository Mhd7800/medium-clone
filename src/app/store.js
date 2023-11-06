import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { MyApiSlice } from '../features/api/MyApiSlice';
import userReducer from "../features/userSlice"
import authReducer from "../features/authSlice"
import userIdSlice from '../features/userIdSlice';



export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducer]: apiSlice.reducer,
    auth: authReducer,
    //userId: userIdSlice.reducer,
  },
  middleware: getDefaultMiddleware=>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});
