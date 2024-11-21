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
const initialState: ProfilePostsSliceState = {
  posts: [],
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

// Fetch Comments for a Specific Post Thunk
export const getPostComments = createAsyncThunk<
  { postId: string; comments: CommentState[] },
  { postId: string; token: string },
  { rejectValue: string }
>(
  "posts/getPostComments",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/public/getPostComments`, {
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