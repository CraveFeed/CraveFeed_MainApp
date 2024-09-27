import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { Tooltip } from "antd";

export interface CommentState {
  author: string;
  avatar: string;
  content: string;
  fullDateTime: string;
  relativeTime: string;
}

export interface PostState {
  getPostStatus: "success" | "loading" | "failed";
  error: string | null;
  id: number;
  name: string;
  time: string;
  tag: string;
  content: string;
  location: string;
  profilePeopleSrc: string;
  postImage: string;
  likeCount: number;
  comments: CommentState[];
}

const initialState: PostState[] = [
  {
    getPostStatus: "success",
    error: null,
    id: 0,
    name: "Sherrr",
    time: "2 hours ago",
    tag: "Business",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo.",
    location: "New York",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_BzB5dE8is3SerSeaykxuTvjZikAX5l8k4Y54fKnP7MnnwfuQE7iG-TSm6Fyb6kjqPk&usqp=CAU",
    postImage:
      "https://img.buzzfeed.com/buzzfeed-static/static/2018-02/27/16/tmp/buzzfeed-prod-fastlane-03/f8295fefe149198bd27788278a9e098b-0.jpg?crop=625:313;0,0%26downsize=1250:*",
    likeCount: 2210,
    comments: [
      {
        author: "Supporter Sherrrr",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: "Sherrr bahi full suport",
        fullDateTime: "2023-05-10 09:22:33",
        relativeTime: "10 hours ago",
      },
      {
        author: "Sherrr1",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjwiMtrJ0c-y_p3qXbssdwPLP9VFp95aJMw&s",
        content: "Vaah Bhai",
        fullDateTime: "2023-05-09 21:22:33",
        relativeTime: "22 hours ago",
      },
    ],
  },
  {
    getPostStatus: "success",
    error: null,
    id: 1,
    name: "Sherrr1",
    time: "2 hours ago",
    tag: "Business",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo.",
    location: "New York",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjwiMtrJ0c-y_p3qXbssdwPLP9VFp95aJMw&s",
    postImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwpkud_BqL_JvbLUuYFUxNq2m44WfsbFpGGw&s",
    likeCount: 1200,
    comments: [
      {
        author: "Supporter Sherrrr",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: "Sherrr bahi full suport bahi bahi",
        fullDateTime: "2023-05-10 09:22:33",
        relativeTime: "10 hours ago",
      },
    ],
  },
  {
    getPostStatus: "success",
    error: null,
    id: 2,
    name: "Sherrr2",
    time: "2 hours ago",
    tag: "Business",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo.",
    location: "New York",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSmH-03LJvl8U3fquWNPXJ1CijPyxiMPIzFV-HvslmoSZpleUlg4QwWt22htQM6xYq7k&usqp=CAU",
    postImage:
      "https://www.shutterstock.com/image-photo/relax-time-sport-fast-food-260nw-2030231213.jpg",
    likeCount: 1320,
    comments: [
      {
        author: "Supporter Sherrrr",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: "Hahaha",
        fullDateTime: "2023-05-10 09:22:33",
        relativeTime: "10 hours ago",
      },
    ],
  },
  {
    getPostStatus: "success",
    error: null,
    id: 3,
    name: "Sherrr3",
    time: "2 hours ago",
    tag: "Business",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo.",
    location: "New York",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjwiMtrJ0c-y_p3qXbssdwPLP9VFp95aJMw&s",
    postImage:
      "https://media.tenor.com/B1pB8zJBiSIAAAAe/eating-cat-suspicious.png",
    likeCount: 122212,
    comments: [],
  },
];

export const fetchHotPost = createAsyncThunk<
  PostState[],
  void,
  { rejectValue: string }
>("post/getHomePosts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3010/getHomePost");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "An unknown error occurred");
  }
});

export const getHotPostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotPost.pending, (state) => {
        state.forEach((post) => (post.getPostStatus = "loading"));
      })
      .addCase(
        fetchHotPost.fulfilled,
        (state, action: PayloadAction<PostState[]>) => {
          return action.payload.map((post) => ({
            ...post,
            getPostStatus: "success",
            error: null,
          }));
        }
      )
      .addCase(fetchHotPost.rejected, (state, action) => {
        state.forEach((post) => {
          post.getPostStatus = "failed";
          post.error = action.payload ?? "An unknown error occurred";
        });
      });
  },
});

export default getHotPostSlice.reducer;
