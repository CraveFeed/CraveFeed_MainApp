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
      Name: "Viraj Patel",
      Username: "@viraj332",
      AvatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqcVXIgWCvTbb55lDj91N_g2rd0F3rma21CA&s",
    },
    {
      Name: "Alina Kane",
      Username: "@alineK",
      AvatarUrl:
        "https://media.istockphoto.com/id/1191193169/photo/portrait-of-a-confident-young-woman-at-the-park.jpg?b=1&s=612x612&w=0&k=20&c=StRxOnMZGBl3714zvEc2vHKJStEkgIfAcpo3zZ8UZ08=",
    },
    {
      Name: "Rina Das",
      Username: "@RiDas",
      AvatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLn0qwpafUMBcMtwFTP-IKb4mfQ_1niJHU-w&s",
    },
  ],
  following: [
    {
      Name: "Vira Patel",
      Username: "@viraj332",
      AvatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqcVXIgWCvTbb55lDj91N_g2rd0F3rma21CA&s",
    },
    {
      Name: "Shashwat Singh",
      Username: "@ShashwatPS",
      AvatarUrl:
        "https://pbs.twimg.com/profile_images/1851275784570478592/lYT2fIG8_400x400.jpg",
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
