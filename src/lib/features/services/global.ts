import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum UserType {
  PERSONAL = "PERSONAL",
  BUSINESS = "BUSINESS",
}

export interface UserState {
  token: string | null;
  userId: string | null;
  type : UserType;
}

const initialState: UserState = {
  token: null,
  userId: null,
  type : UserType.BUSINESS,
};

export const globalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokenAndId: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.type = action.payload.type;
    },
    clearTokenAndId: (state) => {
      state.token = null;
      state.userId = null;
      state.type = UserType.BUSINESS;
    },
  },
});

export const { setTokenAndId, clearTokenAndId } =
  globalSlice.actions;

export default globalSlice.reducer;
