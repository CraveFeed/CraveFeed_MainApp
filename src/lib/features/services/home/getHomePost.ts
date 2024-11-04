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

export interface PostState {
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
  isLiked: boolean;
}

const initialState: PostState[] = [
  {
    getPostStatus: "success",
    error: null,
    userAvatar:
      "https://pbs.twimg.com/profile_images/1691871569478561792/k1H_VfPB_400x400.jpg",
    postId: 0, // Changed `id` to `postId`
    name: "Snehal Saurabh",
    timeDescription: "2 hours ago",
    tag: "Business",
    description: `🍛 Egg Biryani bliss at MultiCuisine, Kota! 🌆Perfectly spiced, loaded with flavor, and that egg on top just ties it all together. If you’re in Kota and craving some comfort food, this place knows how to do biryani right! 😋🥄#EggBiryani #KotaEats #FoodieAdventures #MultiCuisineKota #BiryaniLovers`, // Changed `content` to `description`
    location: "New York",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_BzB5dE8is3SerSeaykxuTvjZikAX5l8k4Y54fKnP7MnnwfuQE7iG-TSm6Fyb6kjqPk&usqp=CAU",
    pictures:
      "https://res.cloudinary.com/dpuzfcod1/image/upload/v1730627408/biryani_kota_htatqb.jpg",
    likes: 2210, // Changed `likeCount` to `likes`
    comments: [
      {
        name: "Supporter Bot",
        userAvatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: "Sherrr bahi full suport",
        commentTime: "2023-05-10 09:22:33",
        relativeTime: "10 hours ago",
      },
      {
        name: "Support Bot 2",
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
      "https://pbs.twimg.com/profile_images/1851275784570478592/lYT2fIG8_400x400.jpg",
    name: "Shashwat Singh",
    timeDescription: "2 hours ago",
    tag: "Business",
    description:
      "🌯 Burrito heaven at Quattro Ristorante in Mumbai! 🌆🔥\nThis one’s loaded with all the good stuff – cheesy, spicy, and just the right amount of messy. If you’re around and craving something seriously satisfying, this spot hits the mark. 🌮💯\n\n#MumbaiEats #BurritoLove #QuattroRistorante #FoodieFinds",
    location: "New York",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjwiMtrJ0c-y_p3qXbssdwPLP9VFp95aJMw&s",
    pictures:
      "https://res.cloudinary.com/dpuzfcod1/image/upload/v1730629335/chipotle_cw1j61.jpg",
    likes: 1200,
    comments: [
      {
        name: "Supporter Bot",
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
    isLiked: true,
  },
  {
    getPostStatus: "success",
    error: null,
    postId: 2,
    userAvatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQHkgg7VmkQEDw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714682557729?e=1736380800&v=beta&t=EkxXbMlJu2upnRYI0EUslZ7h7V8MCozC2xXrwcDbTLE",
    name: "Harshit Shrivastava",
    timeDescription: "1 day ago",
    tag: "Business",
    description:
      "☀️ Morning vibes with my favorites and the best bedai in town! Stopped by Gwalior Railway Station with friends (and our awesome faculty!) for that perfect crispy bedai and spicy aloo sabzi. Nothing like sharing good food and laughs together. 😊🍛#GwaliorDiaries #BedaiLove #RailwayStationEats #GoodTimes #FoodAndFriends",
    location: "New York",
    profilePeopleSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjwiMtrJ0c-y_p3qXbssdwPLP9VFp95aJMw&s",
    pictures:
      "https://res.cloudinary.com/dpuzfcod1/image/upload/v1730627652/gwalior_bedai_pp907k.jpg",
    likes: 8,
    comments: [
      {
        name: "Supporter Bot",
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

export const fetchHomePost = createAsyncThunk<
  PostState[],
  { userId: string },
  { rejectValue: string }
>("post/getHomePosts", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "http://ec2-3-107-106-246.ap-southeast-2.compute.amazonaws.com:3000/getPosts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
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

export const getHomePostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePost.pending, (state) => {
        state.forEach((post) => (post.getPostStatus = "loading"));
      })
      .addCase(
        fetchHomePost.fulfilled,
        (state, action: PayloadAction<PostState[]>) => {
          return action.payload.map((post) => ({
            ...post,
            getPostStatus: "success",
            error: null,
          }));
        }
      )
      .addCase(fetchHomePost.rejected, (state, action) => {
        state.forEach((post) => {
          post.getPostStatus = "failed";
          post.error = action.payload ?? "An unknown error occurred";
        });
      });
  },
});

export default getHomePostSlice.reducer;
