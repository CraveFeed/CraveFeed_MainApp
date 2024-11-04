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
  latitude: string;
  longitude: string;
}

const initialState: ProfilePostState[] = [
  {
    getPostStatus: "success",
    error: null,
    userAvatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQGTntx-N5e2lw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1676827911193?e=1736380800&v=beta&t=QL9g0XW1DlsXbL2GFQ7cl7hL7l73uE1fLdyueImtC8k",
    postId: 0, // Changed `id` to `postId`
    name: "Vibhor Phalke",
    timeDescription: "12 days ago",
    tag: "Personal",
    description:
      "🍻 Beer tasting at Effingut with the crew! Tried a bunch of different brews, and every sip was better than the last. Nothing like good drinks, good laughs, and great company. Cheers to more nights like this! 🍺✨#Effingut #BeerTasting #GoodVibes #FriendsAndBrews #Cheers", // Changed `content` to `description`
    location: "Delhi",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_BzB5dE8is3SerSeaykxuTvjZikAX5l8k4Y54fKnP7MnnwfuQE7iG-TSm6Fyb6kjqPk&usqp=CAU",
    pictures:
      "https://res.cloudinary.com/dpuzfcod1/image/upload/v1730654842/effing_gut_beer_x0j2sp.jpg",
    likes: 420, // Changed `likeCount` to `likes`
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
    latitude: "40.7128",
    longitude: "74.0060",
    userId: "user1",
  },
  {
    getPostStatus: "success",
    error: null,
    postId: 1,
    userAvatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQGTntx-N5e2lw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1676827911193?e=1736380800&v=beta&t=QL9g0XW1DlsXbL2GFQ7cl7hL7l73uE1fLdyueImtC8k",
    name: "Vibhor Phalke",
    timeDescription: "1 month ago",
    tag: "Personal",
    description:
      "🍜 Found the perfect udon bowl in Delhi! So tasty, I’m still thinking about it. Can’t wait to dig into this again next time! 😋#DelhiEats #UdonLove #SoGood #FoodieAdventures",
    location: "Mumbai",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjwiMtrJ0c-y_p3qXbssdwPLP9VFp95aJMw&s",
    pictures:
      "https://res.cloudinary.com/dpuzfcod1/image/upload/v1730655361/udon_cjf3ac.jpg",
    likes: 6969,
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
    latitude: "40.7128",
    longitude: "74.0060",
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
      "http://ec2-3-107-106-246.ap-southeast-2.compute.amazonaws.com:3000/getPostsById",
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
