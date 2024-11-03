import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  userId: string;
  name: string;
  avatar: string;
  username: string;
}

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [
    {
      userId: "user1",
      name: "Sanjeev Kapoor",
      avatar:
        "https://images.forbesindia.com/media/images/2018/Jun/img_106499_chefsanjeevkapoor3.jpg",
      username: "@sanjeevkapoor",
    },
    {
      userId: "user2",
      name: "David Chang",
      avatar:
        "https://static01.nyt.com/images/2024/04/05/multimedia/05chile-trademark1-vblc/05chile-trademark1-vblc-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      username: "@davidchang",
    },
    {
      userId: "user3",
      name: "Bob Johnson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      username: "bobjohnson",
    },
  ],
  status: "idle",
  error: null,
};

export const fetchRecommendedUsers = createAsyncThunk<
  User[],
  { userId: string },
  { rejectValue: string }
>("users/fetchRecommendedUsers", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "http://ec2-3-107-106-246.ap-southeast-2.compute.amazonaws.com:3000/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: userId }),
      }
    );

    if (!response.ok) {
      throw new Error("Server Error");
    }

    const data: User[] = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch users");
  }
});

export const recommentUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRecommendedUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = "succeeded";
          state.users = action.payload;
        }
      )
      .addCase(fetchRecommendedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export default recommentUserSlice.reducer;
