import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Posts {}
interface followers {}
interface following {}

interface editProfInput {
  userId: string;
  bio: string;
  firstname: string;
  lastname: string;
  tag: string;
}

export interface getProfileState {
  getProfileStatus: "success" | "loading" | "failed";
  username: string;
  bio: string;
  avatar: string;
  firstname: string;
  lastname: string;
  coverImage: string;
  noOfPosts: number;
  noOfFollowers: number;
  noOfFollowing: number;
  userPosts: string;
  followers: string;
  following: string;
}

const initialState: getProfileState = {
  getProfileStatus: "success",
  bio: "Hey there! I'm Vibhor, a huge food enthusiast.",
  avatar: "Avatar S3 hosted url",
  username: "@vibhorphalke",
  firstname: "Vibhor",
  lastname: "Phalke",
  noOfFollowers: 5000,
  noOfFollowing: 13,
  coverImage: "Avatar S3 hosted url",
  noOfPosts: 10,
  userPosts: "",
  followers: "",
  following: "",
};

export const getProfileCall = createAsyncThunk(
  "bio/getBio",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3010/getProfileInfo");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const editProfileCall = createAsyncThunk(
  "bio/addComment",
  async (editProfData: editProfInput, { dispatch }) => {
    try {
      dispatch(
        getProfileSlice.actions.tempProfilePopulate({
          bio: editProfData.bio,
          firstname: editProfData.firstname,
          lastname: editProfData.lastname,
        })
      );
      const response = await fetch("http://localhost:3010/editUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: editProfData.userId,
          bio: editProfData.bio,
          firstname: editProfData.firstname,
          lastname: editProfData.lastname,
          tag: editProfData.tag,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      return (error as Error).message;
    }
  }
);

export const getProfileSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    tempProfilePopulate: (state, action) => {
      state.bio = action.payload.bio;
      state.firstname = action.payload.firstName;
      state.lastname = action.payload.lastname;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileCall.pending, (state) => {
      state.getProfileStatus = "loading";
    });
    builder.addCase(getProfileCall.fulfilled, (state, action) => {
      state.getProfileStatus = "success";
      state.bio = action.payload.bio;
      state.username = action.payload.username;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.noOfFollowers = action.payload.noOfFollowers;
      state.noOfFollowing = action.payload.noOfFollowing;
      state.avatar = action.payload.avatar;
      state.coverImage = action.payload.coverImage;
      state.noOfPosts = action.payload.noOfPosts;
      state.userPosts = action.payload.userPosts;
      state.followers = action.payload.followers;
    });
    builder.addCase(getProfileCall.rejected, (state) => {
      state.getProfileStatus = "failed";
    });
  },
});

export default getProfileSlice.reducer;
