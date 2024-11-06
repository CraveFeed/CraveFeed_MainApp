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
  pictures: string[];
  userId: string;
  likes: number;
  comments: CommentState[];
  longitude: string;
  latitude: string;
  isLiked: boolean;
}

const initialState: ExplorePostState[] = [
  {
    getPostStatus: "success",
    error: null,
    userAvatar:
      "https://images.forbesindia.com/media/images/2018/Jun/img_106499_chefsanjeevkapoor3.jpg",
    postId: 0, // Changed `id` to `postId`
    name: "Sanjeev Kapoor",
    timeDescription: "2 hours ago",
    tag: "Business",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo.", // Changed `content` to `description`
    location: "New York",
    profilePeopleSrc:
      "https://images.forbesindia.com/media/images/2018/Jun/img_106499_chefsanjeevkapoor3.jpg",
    pictures:
      ["https://i.ytimg.com/vi/PaeA_LDjNFs/maxresdefault.jpg" ,
        "https://curlytales.com/wp-content/uploads/2024/05/sanjeev-kapoor.jpg"
      ],
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
    isLiked: false,
  },
  {
    getPostStatus: "success",
    error: null,
    postId: 1,
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqFzLzdKwtfxu_Ze4RTGa6oT3d0j94Gmr4TA&s",
    name: "Uncle Roger",
    timeDescription: "2 hours ago",
    tag: "Business",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo.",
    location: "New York",
    profilePeopleSrc:
      "https://static.wikia.nocookie.net/uncle-roger/images/6/68/UncleRoger.png/revision/latest?cb=20201220214854",
    pictures:
      ["https://i.ytimg.com/vi/b9rs3Aznrt0/maxresdefault.jpg", "https://i.ytimg.com/vi/bGtR3l_JeUo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCejx91Dtf7ZnEo2JLiYAbhHMZqQw", "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2024/09/18115540/whatsapp-image-2024-09-12-at-8-34-17-pm-806x605-1.jpeg"],
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
    isLiked: false,
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
