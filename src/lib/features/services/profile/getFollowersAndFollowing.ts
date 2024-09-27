import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FollowerState {
  status: "idle" | "loading" | "succeeded" | "failed";
  followers: FollowerData[];
  following: FollowerData[];
  error: string | null;
}

interface FollowerData {
  name: string;
  username: string;
  img: string;
}

const initialState: FollowerState = {
  status: "idle",
  followers: [],
  following: [],
  error: null,
};

export const getFollowersCall = createAsyncThunk(
  "followers/getFollowers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3010/getFollowers");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getFollowingCall = createAsyncThunk(
  "followers/getFollowing",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3010/getFollowing");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getFollowerSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFollowersCall.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getFollowersCall.fulfilled,
        (state, action: PayloadAction<FollowerData[]>) => {
          state.status = "succeeded";
          state.followers = action.payload;
        }
      )
      .addCase(getFollowersCall.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch followers";
      })
      .addCase(getFollowingCall.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getFollowingCall.fulfilled,
        (state, action: PayloadAction<FollowerData[]>) => {
          state.status = "succeeded";
          state.following = action.payload;
        }
      )
      .addCase(getFollowingCall.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch following";
      });
  },
});

export default getFollowerSlice.reducer;
