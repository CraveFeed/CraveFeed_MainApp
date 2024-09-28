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

export interface ProfilePostState {
  getPostStatus: "success" | "loading" | "failed";
  error: string | null;
  postId: number;
  name: string;
  userAvatar: string;
  timeDescription: string;
  tag: string;
  description: string;
  location: string;
  profilePeopleSrc: string;
  pictures: string;
  userId: string;
  likes: number;
  comments: CommentState[];
}

const initialState: ProfilePostState[] = [
  {
    getPostStatus: "success",
    error: null,
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTyAd5BNld8pgb66ngEhStNvODKYpUHhZgdQ&s",
    postId: 0, // Changed `id` to `postId`
    name: "Sherrr",
    timeDescription: "2 hours ago",
    tag: "Business",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo.", // Changed `content` to `description`
    location: "New York",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_BzB5dE8is3SerSeaykxuTvjZikAX5l8k4Y54fKnP7MnnwfuQE7iG-TSm6Fyb6kjqPk&usqp=CAU",
    pictures:
      "https://img.buzzfeed.com/buzzfeed-static/static/2018-02/27/16/tmp/buzzfeed-prod-fastlane-03/f8295fefe149198bd27788278a9e098b-0.jpg?crop=625:313;0,0%26downsize=1250:*",
    likes: 2210, // Changed `likeCount` to `likes`
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
    userId: "user1",
  },
  {
    getPostStatus: "success",
    error: null,
    postId: 1,
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsuVlEFGYuDv8K6UULQoMhvyxo_1EwR205Jw&s",
    name: "Sherrr1",
    timeDescription: "2 hours ago",
    tag: "Business",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo.",
    location: "New York",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjwiMtrJ0c-y_p3qXbssdwPLP9VFp95aJMw&s",
    pictures:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwpkud_BqL_JvbLUuYFUxNq2m44WfsbFpGGw&s",
    likes: 1200,
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
    userId: "user2",
  },
];

export const getProfilePost = createAsyncThunk<
  ProfilePostState[],
  { userId: string },
  { rejectValue: string }
>("post/getHomePosts", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "http://ec2-3-107-8-69.ap-southeast-2.compute.amazonaws.com:3000/getPostsById",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "An unknown error occurred");
  }
});

export const getProfilePostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfilePost.pending, (state) => {
        state.forEach((post) => (post.getPostStatus = "loading"));
      })
      .addCase(
        getProfilePost.fulfilled,
        (state, action: PayloadAction<ProfilePostState[]>) => {
          return action.payload.map((post) => ({
            ...post,
            getPostStatus: "success",
            error: null,
          }));
        }
      )
      .addCase(getProfilePost.rejected, (state, action) => {
        state.forEach((post) => {
          post.getPostStatus = "failed";
          post.error = action.payload ?? "An unknown error occurred";
        });
      });
  },
});

export default getProfilePostSlice.reducer;
