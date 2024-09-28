import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  viewUserId: string | null;
}

const initialState: UserState = {
  userId: null,
  viewUserId: null,
};

export const globalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    clearUserId: (state) => {
      state.userId = null;
    },
    setViewUserId: (state, action: PayloadAction<string>) => {
      state.viewUserId = action.payload;
    },
    clearViewUserId: (state) => {
      state.viewUserId = null;
    },
  },
});

export const { setUserId, clearUserId, setViewUserId, clearViewUserId } =
  globalSlice.actions;

export default globalSlice.reducer;
