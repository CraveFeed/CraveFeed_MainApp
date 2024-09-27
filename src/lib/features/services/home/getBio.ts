import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BioState {
  getBioStatus: "success" | "loading" | "failed";
  error: string | null;
  bio: string;
  username: string;
  firstName: string;
  lastname: string;
  noOfFollowers: string;
  noOfFollowing: string;
  Avatar: string;
}

const initialState: BioState = {
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

export const fetchBioState = createAsyncThunk<
  BioState,
  void,
  { rejectValue: string }
>("bio/getBio", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3010/getBio");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data as BioState;
  } catch (error: any) {
    return rejectWithValue(error.message || "An unknown error occurred");
  }
});

export const getBioSlice = createSlice({
  name: "bio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBioState.pending, (state) => {
        state.getBioStatus = "loading";
      })
      .addCase(
        fetchBioState.fulfilled,
        (state, action: PayloadAction<BioState>) => {
          return {
            ...state,
            ...action.payload,
            getBioStatus: "success",
            error: null,
          };
        }
      )
      .addCase(fetchBioState.rejected, (state, action) => {
        state.getBioStatus = "failed";
        state.error = action.payload ?? "An unknown error occurred";
      });
  },
});

export default getBioSlice.reducer;
