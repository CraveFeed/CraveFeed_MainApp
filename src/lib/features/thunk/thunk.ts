import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface PostState {
  id: Number;
  todo: String;
  completed: Boolean;
  userId: Number;
  status: "success" | "loading" | "fialed";
}

const initialState: PostState = {
  id: 0,
  todo: "default",
  completed: false,
  userId: 0,
  status: "success",
};

export const fetchPost = createAsyncThunk("post/fetchPost", async () => {
  try {
    const response = await axios.get("https://dummyjson.com/todos/1");
    return response.data;
  } catch (error) {
    return (error as Error).message;
  }
});

export const postSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.status = "success";
      state.id = action.payload.id;
      state.todo = action.payload.todo;
      state.completed = action.payload.completed;
      state.userId = action.payload.userId;
    });
    builder.addCase(fetchPost.rejected, (state) => {
      state.status = "fialed";
    });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default postSlice.reducer;
