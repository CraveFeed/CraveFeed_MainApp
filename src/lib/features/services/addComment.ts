import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface commentData {
  postId: String;
  userId: String;
  content: String;
}

export interface addCommentState {
  getCommentStatus: "success" | "loading" | "failed";
  content: String;
  postId: String;
  userId: String;
}

const initialState: addCommentState = {
  getCommentStatus: "success",
  content: "default",
  postId: "default",
  userId: "default",
};

export const addCommentCall = createAsyncThunk(
  "bio/addComment",
  async (commentData: commentData, { dispatch }) => {
    try {
      dispatch(addCommentSlice.actions.populateAddCommentState(commentData));
      const response = await axios.post("https://localhost:3000/postComment", {
        postID: commentData.postId,
        userId: commentData.userId,
        content: commentData.content,
      });
      return response.data;
    } catch (error) {
      return (error as Error).message;
    }
  }
);

export const addCommentSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    populateAddCommentState: (state, action) => {
      (state.content = action.payload.content),
        (state.postId = action.payload.postId),
        (state.userId = action.payload.userId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCommentCall.pending, (state) => {
      state.getCommentStatus = "loading";
    });
    builder.addCase(addCommentCall.fulfilled, (state, action) => {
      state.getCommentStatus = "success";
    });
    builder.addCase(addCommentCall.rejected, (state) => {
      state.getCommentStatus = "failed";
    });
  },
});

export const { populateAddCommentState } = addCommentSlice.actions;

export default addCommentSlice.reducer;
