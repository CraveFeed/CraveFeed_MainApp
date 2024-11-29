// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface CommentState {
//   author: string;
//   avatar: string;
//   content: string;
//   fullDateTime: string;
//   relativeTime: string;
// }

// export interface ProfilePostState {
//   getPostStatus: "success" | "loading" | "failed";
//   error: string | null;
//   postId: number;
//   title: string;
//   description: string;
//   latitude: string;
//   longitude: string;
//   impressions: string;
//   tag: string;
//   name: string;
//   userAvatar: string;
//   timeDescription: string;
//   type: string;
//   location: string;
//   profilePeopleSrc: string;
//   pictures: string[];
//   userId: string;
//   likes: number;
//   comments: CommentState[];
// }

// interface ProfilePostsSliceState {
//   posts: ProfilePostState[];
//   status: "idle" | "loading" | "success" | "failed";
//   error: string | null;
// }

// const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

// const initialState: ProfilePostsSliceState = {
//   posts: [],
//   status: "idle",
//   error: null,
// };

// export const getProfilePost = createAsyncThunk<
//   ProfilePostState[],
//   { userId: string; token: string },
//   { rejectValue: string }
// >("/public/getUsersPosts", async ({ userId, token }, { rejectWithValue }) => {
//   try {
//     console.log("APIT URL :-- " , API_URL)
//     const response = await fetch(`${API_URL}/public/getUsersPosts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//       body: JSON.stringify({ userId }),
//     });

//     console.log("Response :- " , response )

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("this response :- " , data);
//     const ress = data.posts.map((post: any) => ({
      // postId: post.id,
      // title: post.title,
      // description: post.description,
      // latitude: post.latitude,
      // longitude: post.longitude,
      // impressions: post.impressions,
      // tag: post.isBusiness ? "Business" : "Regular",
      // name: `${post.user.firstName} ${post.user.lastName}`,
      // userAvatar: post.user.avatar,
      // timeDescription: "1 hour ago",
      // type: post.user.Type,
      // pictures: post.pictures,
      // likes: post._count.likes + post._count.comments,
      // location: "",
      // profilePeopleSrc: "",
      // userId: post.user.id,
      // getPostStatus: "success",
      // error: null,
      // comments: [],
//     }));
    
//     console.log("Profile Post response : - \n" , ress)
//     return ress;
//   } catch (error: any) {
//     return rejectWithValue(error.message || "An unknown error occurred");
//   }
// });

// export const getProfilePostSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getProfilePost.pending, (state) => {
//         console.log('Pending state');
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(
//         getProfilePost.fulfilled,
//         (state, action: PayloadAction<ProfilePostState[]>) => {
//           console.log('Fulfilled state:', action.payload);
//           state.posts = action.payload;
//           state.status = "success";
//         }
//       )
//       .addCase(getProfilePost.rejected, (state, action) => {
//         console.log('Rejected state:', action.payload);
//         state.status = "failed";
//         state.error = action.payload ?? "An unknown error occurred";
//       });
//   }
// });

// export default getProfilePostSlice.reducer;



import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Comment Interface
export interface CommentState {
  commentId: string;
  author: string;
  avatar: string;
  content: string;
  fullDateTime: string;
  relativeTime: string;
}

// Profile Post Interface
export interface ProfilePostState {
  getPostStatus: "success" | "loading" | "failed";
  error: string | null;
  postId: string;
  title: string;
  description: string;
  latitude: string;
  longitude: string;
  impressions: string;
  tag: string;
  name: string;
  userAvatar: string;
  timeDescription: string;
  type: string;
  location: string;
  profilePeopleSrc: string;
  pictures: string[];
  userId: string;
  likes: number;
  comments: CommentState[];
}

// Slice State Interface
interface ProfilePostsSliceState {
  posts: ProfilePostState[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

// Initial State
// const initialState: ProfilePostsSliceState = {
//   posts: [],
//   status: "idle",
//   error: null,
// };

const initialState: ProfilePostsSliceState = {
  posts: [
    {
      getPostStatus: "success",
      error: null,
      postId: "post2",
      title: "The Future of Work",
      description: "Chilled out at Effingut Brewery, and it was an experience to remember! 🍻 Tried their incredible craft beers, each better than the last. The lively ambiance made the evening even more special. Cheers to good vibes, great company, and amazing brews! 🍺✨",
      latitude: "40.7128",
      longitude: "-74.0060",
      impressions: "200",
      tag: "Business",
      name: "Vibhor Phalke",
      userAvatar: "https://media.licdn.com/dms/image/v2/D4D03AQGTntx-N5e2lw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1676827911193?e=1736380800&v=beta&t=QL9g0XW1DlsXbL2GFQ7cl7hL7l73uE1fLdyueImtC8k",
      timeDescription: "5 hours ago",
      type: "Business",
      location: "New York, NY",
      profilePeopleSrc: "",
      pictures: ["https://res.cloudinary.com/dpuzfcod1/image/upload/v1730654842/effing_gut_beer_x0j2sp.jpg"],
      userId: "user1",
      likes: 180,
      comments: [
        {
          commentId: "comment3",
          author: "Anjali Singh",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAkC30CMSbfN_wwuaPndtAPYYcQ_ZQ9T89maqxVRrV3-C1b2O1Md2th_HGZeJ-uBglDPw&usqp=CAU",
          content: "Thought-provoking post, Vibhor! Definitely some points to ponder.",
          fullDateTime: "2024-11-22T08:30:00Z",
          relativeTime: "4 hours ago",
        },
        {
          commentId: "comment4",
          author: "Ramesh Bhat",
          avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          content: "Remote work has truly changed the game. Excellent points.",
          fullDateTime: "2024-11-22T09:00:00Z",
          relativeTime: "3.5 hours ago",
        },
      ],
    },
    {
      getPostStatus: "success",
      error: null,
      postId: "post3",
      title: "Leadership Redefined",
      description: "Had the most delightful bowl of udon at a cozy Japanese restaurant! 🍜 The noodles were perfectly chewy, and the broth was rich and flavorful, warming my soul with every sip. The authentic ambiance made the experience even more special. Definitely a treat for all the senses—can't wait to go back! 🇯🇵✨",
      latitude: "51.5074",
      longitude: "-0.1278",
      impressions: "250",
      tag: "Business",
      name: "Vibhor Phalke",
      userAvatar: "https://media.licdn.com/dms/image/v2/D4D03AQGTntx-N5e2lw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1676827911193?e=1736380800&v=beta&t=QL9g0XW1DlsXbL2GFQ7cl7hL7l73uE1fLdyueImtC8k",
      timeDescription: "8 hours ago",
      type: "Business",
      location: "London, UK",
      profilePeopleSrc: "",
      pictures: ["https://res.cloudinary.com/dpuzfcod1/image/upload/v1730655361/udon_cjf3ac.jpg"],
      userId: "user1",
      likes: 240,
      comments: [
        {
          commentId: "comment5",
          author: "Sneha Mehta",
          avatar: "https://i.pinimg.com/236x/8d/31/a6/8d31a685fbdef42e84fd7dc4b2902d52.jpg",
          content: "Leadership is indeed evolving. Thanks for sharing, Vibhor!",
          fullDateTime: "2024-11-22T06:00:00Z",
          relativeTime: "6 hours ago",
        },
        {
          commentId: "comment6",
          author: "Karan Malhotra",
          avatar: "https://i.pinimg.com/736x/80/05/9a/80059a0fa653ae13786400c6006421e1.jpg",
          content: "Great read! Empathy and adaptability are key.",
          fullDateTime: "2024-11-22T06:30:00Z",
          relativeTime: "5.5 hours ago",
        },
      ],
    },
  ],
  status: "idle",
  error: null,
};



// API URL
const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

// Fetch Profile Posts Thunk
export const getProfilePost = createAsyncThunk<
  ProfilePostState[],
  { userId: string; token: string },
  { rejectValue: string }
>("/public/getUsersPosts", async ({ userId, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/public/getUsersPosts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    const ress = data.posts.map((post: any) => ({
      postId: post.id,
      title: post.title,
      description: post.description,
      latitude: post.latitude,
      longitude: post.longitude,
      impressions: post.impressions,
      tag: post.isBusiness ? "Business" : "Regular",
      name: `${post.user.firstName} ${post.user.lastName}`,
      userAvatar: post.user.avatar,
      timeDescription: "1 hour ago",
      type: post.user.Type,
      pictures: post.pictures,
      likes: post._count.likes + post._count.comments,
      location: "",
      profilePeopleSrc: "",
      userId: post.user.id,
      getPostStatus: "success",
      error: null,
      comments: [],
    }));
    
    return ress;
  } catch (error: any) {
    return rejectWithValue(error.message || "An unknown error occurred");
  }
});

export const getPostComments = createAsyncThunk<
  { postId: string; comments: CommentState[] },
  { postId: string; token: string },
  { rejectValue: string }
>(
  "posts/getPostComments",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      console.log("Comments :- " , token )
      const response = await fetch(`${API_URL}/public/getCommentsOfPosts?page=1&limit=10`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      const comments = data.comments.map((comment: any) => ({
        commentId: comment.id,
        author: `${comment.user.firstName} ${comment.user.lastName}`,
        avatar: comment.user.avatar,
        content: comment.content,
        fullDateTime: comment.createdAt,
      }));

      console.log("This is the api that is messing around :- " , data.comments);

      return { postId, comments };
    } catch (error: any) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);

// Profile Posts Slice
export const getProfilePostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Profile Posts Fetching
      .addCase(getProfilePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProfilePost.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "success";
      })
      .addCase(getProfilePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "An unknown error occurred";
      })
      
      // Handle Comments Fetching
      .addCase(getPostComments.fulfilled, (state, action) => {
        const postIndex = state.posts.findIndex(
          post => post.postId === action.payload.postId
        );
        
        if (postIndex !== -1) {
          state.posts[postIndex].comments = action.payload.comments;
        }
      });
  }
});

export default getProfilePostSlice.reducer;