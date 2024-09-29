import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FollowerState {
  status: "idle" | "loading" | "succeeded" | "failed";
  followers: FollowerData[];
  following: FollowerData[];
  error: string | null;
}

interface FollowerData {
  Name: string;
  Username: string;
  AvatarUrl: string;
}

const initialState: FollowerState = {
  status: "idle",
  followers: [
    {
      Name: "John Doe",
      Username: "@johndoe",
      AvatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbSIbfes4K5CLLIAnBoKhAUGptxjtHQ9IKWQ&s",
    },
    {
      Name: "Jane Smith",
      Username: "@janesmith",
      AvatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPgyKrZsZ62qhHtdx_yB4S9Eg97-2Hb1S9bw&s",
    },
    {
      Name: "Alice Johnson",
      Username: "@alicej",
      AvatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1mU63yEwB_pIVB0bo8yoH34s2H8F3GzC-MA&s",
    },
  ],
  following: [
    {
      Name: "Bob Wilson",
      Username: "@bobwilson",
      AvatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1mU63yEwB_pIVB0bo8yoH34s2H8F3GzC-MA&s",
    },
    {
      Name: "Emma Brown",
      Username: "@emmab",
      AvatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbSIbfes4K5CLLIAnBoKhAUGptxjtHQ9IKWQ&s",
    },
  ],
  error: null,
};

export const getFollowersCall = createAsyncThunk(
  "followers/getFollowers",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://ec2-3-107-106-246.ap-southeast-2.compute.amazonaws.com:3000/getFollowers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        }
      );
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
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://ec2-3-107-106-246.ap-southeast-2.compute.amazonaws.com:3000/getFollowing",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        }
      );
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
