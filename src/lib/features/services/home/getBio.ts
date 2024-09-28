import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BioState {
  getBioStatus: "success" | "loading" | "failed";
  error: string | null;
  bio: string;
  username: string;
  firstname: string;
  lastname: string;
  noOfPosts: string;
  noOfFollowers: string;
  noOfFollowing: string;
  avatar: string;
}

const initialState: BioState = {
  getBioStatus: "success",
  error: null,
  bio: "Hey there! I'm Vibhor, a huge food enthusiast.",
  username: "@vibhorphalke",
  firstname: "Vibhor",
  lastname: "Phalke",
  noOfFollowers: "5000",
  noOfFollowing: "13",
  noOfPosts: "3",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRashZFbk3gWJknbzmcAOKCoNuyHUAMX2brHA&s",
};

export const fetchBioState = createAsyncThunk<
  BioState,
  { userId: string },
  { rejectValue: string }
>("bio/getBio", async ({ userId }, { rejectWithValue }) => {
  try {
    console.log("check User ID:", userId);
    const response = await fetch(
      "http://ec2-3-107-8-69.ap-southeast-2.compute.amazonaws.com:3000/getProfileBio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: userId }),
      }
    );

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
