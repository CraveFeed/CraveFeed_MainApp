import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

export interface FollowerState {
  status: "idle" | "loading" | "succeeded" | "failed";
  followers: FollowerData[];
  following: FollowerData[];
  error: string | null;
}

interface FollowerData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  type: string;
}

const initialState: FollowerState = {
  status: "idle",
  followers: [
    {
      id: "1",
      firstName: "Viraj",
      lastName: "Kadam",
      username: "@viraj332",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqcVXIgWCvTbb55lDj91N_g2rd0F3rma21CA&s",
      type : "PERSONAL"
      },
    {
      id: "2",
      firstName: "Alina",
      lastName: "Kane",
      username: "@AlinaKane",
      avatar:
        "https://media.istockphoto.com/id/1191193169/photo/portrait-of-a-confident-young-woman-at-the-park.jpg?b=1&s=612x612&w=0&k=20&c=StRxOnMZGBl3714zvEc2vHKJStEkgIfAcpo3zZ8UZ08=",
      type : "BUSINESS"
      },
    {
      id: "3",
      firstName: "Rina",
      lastName: "Das",
      username: "@RiDas",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLn0qwpafUMBcMtwFTP-IKb4mfQ_1niJHU-w&s",
      type: "PERSONAL",
    },
  ],
  following: [
    {
      id : "1",
      firstName: "Viraj",
      lastName : "Kadam",
      username: "@viraj332",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqcVXIgWCvTbb55lDj91N_g2rd0F3rma21CA&s",
      type : "PERSONAL"
      },
    {
      id: "2",
      firstName: "Shashwat",
      lastName : "Singh",
      username: "@ShashwatPS",
      avatar:
        "https://pbs.twimg.com/profile_images/1851275784570478592/lYT2fIG8_400x400.jpg",
      type : "BUSINESS"  
    },
  ],
  error: null,
};

const uniqueData = (data: FollowerData[]): FollowerData[] =>
  data.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  export const getFollowersCall = createAsyncThunk(
    "followers/getFollowers",
    async (
      { userId, token }: { userId: string; token: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `${API_URL}/public/getUserFollowers?page=1&limit=10`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: userId }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Followers API Response:", data);

        return data.followers.map((item: any) => ({
          id: item.follower.id,
          username: item.follower.username,
          firstName: item.follower.firstName,
          lastName: item.follower.lastName,
          avatar: item.follower.avatar,
          type: item.follower.Type,
        }));
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );
  

export const getFollowingCall = createAsyncThunk(
  "followers/getFollowing",
  async (
    { userId, token }: { userId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/public/getUserFollowing?page=1&limit=10`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Following API Response:", data);

      return data.following.map((item: any) => ({
        id: item.following.id,
        username: item.following.username,
        firstName: item.following.firstName,
        lastName: item.following.lastName,
        avatar: item.following.avatar,
        type: item.following.Type,
      }));
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      });
  },
});

export default getFollowerSlice.reducer;
