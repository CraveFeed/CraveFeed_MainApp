import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import postReducer from "./features/services/testThunk";
import getBioReducer from "./features/services/home/getBio";
import { getHomePostSlice } from "./features/services/home/getHomePost";
import { addCommentSlice } from "./features/services/addComment";
import { getProfileSlice } from "./features/services/profile/getProfile";
import { getExplorePostSlice } from "./features/services/home/getExplorePost";
import { getHotPostSlice } from "./features/services/home/getHotPost";
import { getFollowerSlice } from "./features/services/profile/getFollowersAndFollowing";
import { globalSlice } from "./features/services/global";
import { getProfilePostSlice } from "./features/services/profile/getProfilePosts";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      post: postReducer,
      // Home
      getBio: getBioReducer,
      getHomePost: getHomePostSlice.reducer,
      getExplorePost: getExplorePostSlice.reducer,
      getHotPost: getHotPostSlice.reducer,

      addComment: addCommentSlice.reducer,
      global: globalSlice.reducer,

      // Profile Slice
      getProfile: getProfileSlice.reducer,
      getFollower: getFollowerSlice.reducer,
      getProfilePost: getProfilePostSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
