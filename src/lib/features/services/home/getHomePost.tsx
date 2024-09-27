import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { Tooltip } from "antd";

export interface CommentState {
  author: React.ReactNode;
  avatar: string;
  content: React.ReactNode;
  datetime: React.ReactNode;
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
    tag: "Bussiness",
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
        author: <React.Fragment><span style={{ color: "ghostwhite" }}>Supporter Sherrrr</span></React.Fragment>,
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: (
          <p>
            Sherrr bahi full suport
          </p>
        ),
        datetime: (
          <Tooltip title="2023-05-10 09:22:33">
            <span>10 hours ago</span>
          </Tooltip>
        ),
      },
       {
        author: <React.Fragment><span style={{ color: "ghostwhite" }}>Sherrr1</span></React.Fragment>,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjwiMtrJ0c-y_p3qXbssdwPLP9VFp95aJMw&s",
        content: (
          <p>
            Vaah Bhai
          </p>
        ),
        datetime: (
          <Tooltip title="2023-05-10 09:22:33">
            <span>22 hours ago</span>
          </Tooltip>
        ),
      },
    ],
  },
  {
    getPostStatus: "success",
    error: null,
    id: 1,
    name: "Sherrr1",
    time: "2 hours ago",
    tag: "Bussiness",
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
        author: <React.Fragment><span style={{ color: "ghostwhite" }}>Supporter Sherrrr</span></React.Fragment>,
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: (
          <p>
            Sherrr bahi full suport bahi bahi
          </p>
        ),
        datetime: (
          <Tooltip title="2023-05-10 09:22:33">
            <span>10 hours ago</span>
          </Tooltip>
        ),
      },
    ],
  },
  {
    getPostStatus: "success",
    error: null,
    id: 2,
    name: "Sherrr2",
    time: "2 hours ago",
    tag: "Bussiness",
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
        author: <React.Fragment><span style={{ color: "ghostwhite" }}>Supporter Sherrrr</span></React.Fragment>,
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: (
          <p>
            Hahaha
          </p>
        ),
        datetime: (
          <Tooltip title="2023-05-10 09:22:33">
            <span>10 hours ago</span>
          </Tooltip>
        ),
      },
    ],
  },
  {
    getPostStatus: "success",
    error: null,
    id: 3,
    name: "Sherrr3",
    time: "2 hours ago",
    tag: "Bussiness",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo.",
    location: "New York",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjwiMtrJ0c-y_p3qXbssdwPLP9VFp95aJMw&s",
    postImage:
      "https://media.tenor.com/B1pB8zJBiSIAAAAe/eating-cat-suspicious.png",
    likeCount: 122212,
    comments: [
      {
        author: <React.Fragment><span style={{ color: "ghostwhite" }}>Supporter Sherrrr</span></React.Fragment>,
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: (
          <p>
            Good Bhai
          </p>
        ),
        datetime: (
          <Tooltip title="2023-05-10 09:22:33">
            <span>10 hours ago</span>
          </Tooltip>
        ),
      },
    ],
  },
];


export const fetchHomePostState = createAsyncThunk<
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
  
    return data.map((post: any) => ({
      ...post,
      comments: post.comments.map((comment: any) => ({
        author: <span style={{ color: "ghostwhite" }}>{comment.author}</span>,
        avatar: comment.avatar,
        content: <p>{comment.content}</p>,
        datetime: (
          <Tooltip title={comment.fullDateTime}>
            <span>{comment.relativeTime}</span>
          </Tooltip>
        ),
      })),
    }));
  } catch (error: any) {
    return rejectWithValue(error.message || "An unknown error occurred");
  }
});

export const getHomePostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePostState.pending, (state) => {
        state.forEach((post) => (post.getPostStatus = "loading"));
      })
      .addCase(
        fetchHomePostState.fulfilled,
        (state, action: PayloadAction<PostState[]>) => {
          return action.payload.map((post) => ({
            ...post,
            getPostStatus: "success",
            error: null,
            comments: [],
          }));
        }
      )
      .addCase(fetchHomePostState.rejected, (state, action) => {
        state.forEach((post) => {
          post.getPostStatus = "failed";
          post.error = action.payload ?? "An unknown error occurred";
        });
      })
  },
});

export default getHomePostSlice.reducer;

