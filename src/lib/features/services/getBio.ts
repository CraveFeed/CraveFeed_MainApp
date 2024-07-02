import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface getBioState {
  getBioStatus: "success" | "loading" | "failed";
  error: string | null;
  bio: String;
  username: String;
  firstName: String;
  lastname: String;
  noOfFollowers: String;
  noOfFollowing: String;
  Avatar: String;
}

const initialState: getBioState = {
  getBioStatus: "success",
  error: null,
  bio: "Hey there! I'm Vibhor, a huge food enthusiast.",
  username: "@vibhorphalke",
  firstName: "Vibhor",
  lastname: "Phalke",
  noOfFollowers: "5000",
  noOfFollowing: "13",
  Avatar: "Avatar S3 hosted url",
};

export const getBioState = createAsyncThunk(
  "bio/getBio",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://localhost:2000/getBio/2");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const getBioSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBioState.pending, (state) => {
      state.getBioStatus = "loading";
    });
    builder.addCase(getBioState.fulfilled, (state, action) => {
      state.getBioStatus = "success";
      state.error = null;
      state.bio = action.payload.bio;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastname = action.payload.lastname;
      state.noOfFollowers = action.payload.noOfFollowers;
      state.noOfFollowing = action.payload.noOfFollowing;
      state.Avatar = action.payload.Avatar;
      //  Object.assign(state, action.payload);
    });
    builder.addCase(getBioState.rejected, (state, action) => {
      state.getBioStatus = "failed";
      state.error = action.payload as string;
    });
  },
});

export default getBioSlice.reducer;
