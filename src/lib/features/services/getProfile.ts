import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Posts {}
interface followers {}
interface following {}

interface editProfInput {
  userId: String;
  bio: String;
  // avatar: String;
  // coverImage: String;
  firstname: String;
  lastname: String;
  tag: String;
}

export interface getProfileState {
  getProfileStatus: "success" | "loading" | "failed";
  username: String;
  bio: String;
  avatar: String;
  firstname: String;
  lastname: String;
  coverImage: String;
  noOfPosts: Number;
  noOfFollowers: Number;
  noOfFollowing: Number;
  //   userPosts: Posts[];
  //   followers: followers[];
  //   following: following[];
  userPosts: String;
  followers: String;
  following: String;
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
      const response = await axios.get(
        "https://localhost:2000/getProfileInfo/2"
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
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
      const response = await axios.post(
        "https://localhost:2000/editUserProfile",
        {
          userId: editProfData.userId,
          bio: editProfData.bio,
          firstname: editProfData.firstname,
          lastname: editProfData.lastname,
          tag: editProfData.tag,
          // coverImage: editProfData.coverImage,
          // avatar: editProfData.avatar,
        }
      );
      return response.data;
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
      // state.avatar = action.payload.avatar;
      // state.coverImage = action.payload.coverImage;
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
      state.firstname = action.payload.firstName;
      state.lastname = action.payload.lastname;
      state.noOfFollowers = action.payload.noOfFollowers;
      state.noOfFollowing = action.payload.noOfFollowing;
      state.avatar = action.payload.avatar;
      state.coverImage = action.payload.coverImage;
      state.noOfPosts = action.payload.noOfPosts;
      state.userPosts = action.payload.userPosts;
      state.followers = action.payload.followers;
      //  Object.assign(state, action.payload);
    });
    builder.addCase(getProfileCall.rejected, (state) => {
      state.getProfileStatus = "failed";
    });
  },
});

export default getProfileSlice.reducer;
