import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import postReducer from "./features/services/testThunk";
import getBioReducer from "./features/services/getBio";
import { addCommentSlice } from "./features/services/addComment";
import { getProfileSlice } from "./features/services/getProfile";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      post: postReducer,
      getBio: getBioReducer,
      addComment: addCommentSlice.reducer,
      getProfile: getProfileSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
