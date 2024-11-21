import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

export interface BioState {
  getBioStatus: "success" | "loading" | "failed";
  error: string | null;
  bio: string | null;
  username: string;
  firstname: string;
  lastname: string;
  noOfPosts: string;
  noOfFollowers: string;
  noOfFollowing: string;
  Type : string;
  avatar: string | null;
}

const initialState: BioState = {
  getBioStatus: "success",
  error: null,
  bio: null,
  username: "@vibhorphalke",
  firstname: "Vibhor",
  lastname: "Phalke",
  noOfFollowers: "5000",
  noOfFollowing: "13",
  noOfPosts: "3",
  Type : "PERSONAL",
  avatar:
    "https://media.licdn.com/dms/image/v2/D4D03AQGTntx-N5e2lw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1676827911193?e=1736380800&v=beta&t=QL9g0XW1DlsXbL2GFQ7cl7hL7l73uE1fLdyueImtC8k",
};

export const fetchBioState = createAsyncThunk<
  BioState,
  { userId: string; token: string },
  { rejectValue: string }
>("bio/getBio", async ({ userId, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/public/getUserProfileSummary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { profileData } = await response.json();

    return {
      bio: profileData.bio,
      username: profileData.username,
      firstname: profileData.firstName,
      lastname: profileData.lastName,
      noOfPosts: profileData._count.posts.toString(),
      noOfFollowers: profileData._count.followers.toString(),
      noOfFollowing: profileData._count.following.toString(),
      avatar: profileData.avatar,
      getBioStatus: "success",
      error: null,
      Type: profileData.Type,
    };
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
