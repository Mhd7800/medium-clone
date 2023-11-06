import { createSlice } from "@reduxjs/toolkit";

export const userIdSlice = createSlice({
  name: "userId",
  initialState: {
    value: null,
  },
  reducers: {
    userId: (state, action) => {
      state.value = action.payload; // Update to state.value
    },
  },
});

export const { userId } = userIdSlice.actions;

export const selectUserId = (state) => state.userId.value; // Update to state.userId.value

export default userIdSlice.reducer;
