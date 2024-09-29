import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { Tooltip } from "antd";

export interface CommentState {
  name: string;
  userAvatar: string;
  content: string;
  commentTime: string;
  relativeTime: string;
}

export interface ExplorePostState {
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
  longitude: string;
  latitude: string;
}

const initialState: ExplorePostState[] = [
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
        name: "Supporter Sherrrr",
        userAvatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: "Sherrr bahi full suport",
        commentTime: "2023-05-10 09:22:33",
        relativeTime: "10 hours ago",
      },
      {
        name: "Sherrr1",
        userAvatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjwiMtrJ0c-y_p3qXbssdwPLP9VFp95aJMw&s",
        content: "Vaah Bhai",
        commentTime: "2023-05-09 21:22:33",
        relativeTime: "22 hours ago",
      },
    ],
    latitude: "40.7128",
    longitude: "-74.0060",
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
        name: "Supporter Sherrrr",
        userAvatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: "Sherrr bahi full suport bahi bahi",
        commentTime: "2023-05-10 09:22:33",
        relativeTime: "10 hours ago",
      },
    ],
    latitude: "40.7128",
    longitude: "-74.0060",
    userId: "user2",
  },
];

export const fetchExplorePost = createAsyncThunk<
  ExplorePostState[],
  { userId: string },
  { rejectValue: string }
>("post/getExplorePosts", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "http://ec2-3-107-106-246.ap-southeast-2.compute.amazonaws.com:3000/getRecommendation",
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
    console.log("recommended \n", data);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "An unknown error occurred");
  }
});

export const getExplorePostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExplorePost.pending, (state) => {
        state.forEach((post) => (post.getPostStatus = "loading"));
      })
      .addCase(
        fetchExplorePost.fulfilled,
        (state, action: PayloadAction<ExplorePostState[]>) => {
          return action.payload.map((post) => ({
            ...post,
            getPostStatus: "success",
            error: null,
          }));
        }
      )
      .addCase(fetchExplorePost.rejected, (state, action) => {
        state.forEach((post) => {
          post.getPostStatus = "failed";
          post.error = action.payload ?? "An unknown error occurred";
        });
      });
  },
});

export default getExplorePostSlice.reducer;
