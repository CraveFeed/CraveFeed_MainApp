import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  token: string | null;
  userId: string | null;
}

const initialState: UserState = {
  token: null,
  userId: null,
};

export const globalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokenAndId: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    clearTokenAndId: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setTokenAndId, clearTokenAndId } =
  globalSlice.actions;

export default globalSlice.reducer;
